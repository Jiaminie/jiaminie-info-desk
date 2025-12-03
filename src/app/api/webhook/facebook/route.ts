import { NextRequest, NextResponse } from "next/server";
import { socialMediaAgent } from "@/lib/agent/ai_agent";
import { HumanMessage } from "@langchain/core/messages";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const VERIFY_TOKEN = process.env.FACEBOOK_VERIFY_TOKEN || "my_secure_token";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode && token) {
    console.log(`Verifying webhook: mode=${mode}, token=${token}, expected=${VERIFY_TOKEN}`);
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      return new NextResponse(challenge, { status: 200 });
    } else {
      console.log("WEBHOOK_VERIFICATION_FAILED: Token mismatch");
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  return new NextResponse("Bad Request", { status: 400 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.object === "page") {
      for (const entry of body.entry) {
        const accountId = entry.id; // Page ID

        // 1. Handle Messaging Events (Direct Messages)
        if (entry.messaging) {
          for (const webhookEvent of entry.messaging) {
            console.log("Received messaging event:", webhookEvent);
            const senderPsid = webhookEvent.sender.id;

            // Handle Text Messages
            if (webhookEvent.message && webhookEvent.message.text) {
              await handleMessage(accountId, senderPsid, webhookEvent);
            } 
            // Handle Postbacks (Button clicks)
            else if (webhookEvent.postback) {
              await handlePostback(accountId, senderPsid, webhookEvent);
            }
          }
        }

        // 2. Handle Feed Events (Posts, Comments, Likes)
        if (entry.changes) {
          for (const change of entry.changes) {
            console.log("Received change event:", change.field, change.value);
            
            if (change.field === "feed") {
              await handleFeedEvent(accountId, change.value);
            } else if (change.field === "leadgen") {
              await handleLeadgenEvent(accountId, change.value);
            } else if (change.field === "mention") {
              await handleMentionEvent(accountId, change.value);
            }
          }
        }
      }

      return new NextResponse("EVENT_RECEIVED", { status: 200 });
    } else {
      return new NextResponse("Not Found", { status: 404 });
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// --- Helper Functions ---

async function ensureAccountExists(platformId: string, name: string = "Unknown Page") {
  let account = await prisma.socialMediaAccount.findFirst({
    where: { platformId: platformId, platform: "facebook" },
  });

  if (!account) {
    console.log(`Creating new SocialMediaAccount for platformId: ${platformId}`);
    account = await prisma.socialMediaAccount.create({
      data: {
        platform: "facebook",
        platformId: platformId,
        name: name,
      },
    });
  }
  return account.id;
}

async function handleMessage(platformAccountId: string, senderPsid: string, webhookEvent: any) {
  const accountId = await ensureAccountExists(platformAccountId);
  const message = webhookEvent.message;
  
  // Save interaction
  const interaction = await prisma.socialMediaInteraction.create({
    data: {
      accountId: accountId,
      type: "MESSAGE",
      direction: "INCOMING",
      content: message.text,
      fromUserId: senderPsid,
      platformId: message.mid,
      metadata: webhookEvent,
    },
  });

  // Send to Agent
  await socialMediaAgent.invoke({
    messages: [
      new HumanMessage({
        content: `Received message from user ${senderPsid}: "${message.text}". Interaction ID: ${interaction.id}. Please handle this.`,
      }),
    ],
  });
}

async function handlePostback(platformAccountId: string, senderPsid: string, webhookEvent: any) {
  const accountId = await ensureAccountExists(platformAccountId);
  const payload = webhookEvent.postback.payload;
  const title = webhookEvent.postback.title;

  // Save interaction
  const interaction = await prisma.socialMediaInteraction.create({
    data: {
      accountId: accountId,
      type: "OTHER", // Postback
      direction: "INCOMING",
      content: `[Postback] ${title} (${payload})`,
      fromUserId: senderPsid,
      metadata: webhookEvent,
    },
  });

  // Send to Agent
  await socialMediaAgent.invoke({
    messages: [
      new HumanMessage({
        content: `User ${senderPsid} clicked button "${title}" (Payload: ${payload}). Interaction ID: ${interaction.id}. Please respond accordingly.`,
      }),
    ],
  });
}

async function handleFeedEvent(platformAccountId: string, value: any) {
  // 1. Ignore events from the page itself to prevent infinite loops
  // We need to know the Page ID. 'platformAccountId' is the Page ID from the webhook entry.
  if (value.from?.id === platformAccountId) {
    console.log("Ignoring event from self (Page ID match):", platformAccountId);
    return;
  }

  const accountId = await ensureAccountExists(platformAccountId, value.from?.name || "Facebook Page");
  const item = value.item; // 'post', 'comment', 'like'
  const verb = value.verb; // 'add', 'edit', 'remove'

  if (verb !== "add") return; // Only handle new items for now

  if (item === "post") {
    // New Post on Page
    await prisma.socialMediaPost.create({
      data: {
        accountId: accountId,
        content: value.message || "",
        status: "PUBLISHED",
        publishedAt: new Date(value.created_time * 1000),
        platformPostId: value.post_id,
        metadata: value,
      },
    });
    console.log("Saved new page post:", value.post_id);

  } else if (item === "comment") {
    // Try to find the internal post ID using the platform's post_id
    const post = await prisma.socialMediaPost.findFirst({
      where: { platformPostId: value.post_id }
    });

    // New Comment on Post
    const interaction = await prisma.socialMediaInteraction.create({
      data: {
        accountId: accountId,
        postId: post ? post.id : undefined, // Only link if we found the internal post
        type: "COMMENT",
        direction: "INCOMING",
        content: value.message,
        fromUserId: value.from.id,
        fromUser: value.from.name,
        platformId: value.comment_id,
        metadata: value,
      },
    });

    // Send to Agent
    await socialMediaAgent.invoke({
      messages: [
        new HumanMessage({
          content: `New comment from ${value.from.name} on post ${value.post_id}: "${value.message}". Interaction ID: ${interaction.id}. Should we reply?`,
        }),
      ],
    });
  }
}

async function handleLeadgenEvent(platformAccountId: string, value: any) {
  const accountId = await ensureAccountExists(platformAccountId);
  // Value contains leadgen_id, form_id, created_time
  // We usually need to fetch lead details from Graph API using leadgen_id
  // For now, we just save the notification
  
  await prisma.socialMediaLead.create({
    data: {
      accountId: accountId,
      platformUserId: "unknown_yet", // Need API call to get user details
      name: "New Lead",
      notes: `Lead ID: ${value.leadgen_id}, Form ID: ${value.form_id}`,
      metadata: value,
      status: "NEW",
    },
  });
  
  console.log("Saved new lead notification:", value.leadgen_id);
}

async function handleMentionEvent(platformAccountId: string, value: any) {
  const accountId = await ensureAccountExists(platformAccountId);
  // Someone mentioned the page
  const interaction = await prisma.socialMediaInteraction.create({
    data: {
      accountId: accountId,
      type: "MENTION",
      direction: "INCOMING",
      content: value.message || "[Mention]",
      fromUserId: value.sender_id,
      fromUser: value.sender_name,
      platformId: value.post_id,
      metadata: value,
    },
  });

  // Send to Agent
  await socialMediaAgent.invoke({
    messages: [
      new HumanMessage({
        content: `Page mentioned by ${value.sender_name}: "${value.message}". Interaction ID: ${interaction.id}.`,
      }),
    ],
  });
}
