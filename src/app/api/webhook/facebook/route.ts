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
        const webhookEvent = entry.messaging[0];
        console.log("Received event:", webhookEvent);

        const senderPsid = webhookEvent.sender.id;
        const message = webhookEvent.message;

        if (message && message.text) {
          // 1. Save interaction
          const interaction = await prisma.socialMediaInteraction.create({
            data: {
              accountId: "facebook_account_id", // In real app, look up based on page ID or recipient ID
              type: "MESSAGE",
              direction: "INCOMING",
              content: message.text,
              fromUserId: senderPsid,
              platformId: message.mid,
              metadata: webhookEvent,
            },
          });

          // 2. Send to Agent
          const result = await socialMediaAgent.invoke({
            messages: [
              new HumanMessage({
                content: `Received message from user ${senderPsid}: "${message.text}". Interaction ID: ${interaction.id}. Please handle this.`,
              }),
            ],
          });

          // 3. Handle Agent Response (if any direct response is generated)
          // The agent might have used tools to reply. If it returns a text message, we could send it here.
          const lastMessage = result.messages[result.messages.length - 1];
          if (lastMessage.content) {
             // Logic to send reply back to Facebook via API would go here
             // For now, we assume the agent uses the 'replyToComment' or similar tool which saves the reply intent
             console.log("Agent response:", lastMessage.content);
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
