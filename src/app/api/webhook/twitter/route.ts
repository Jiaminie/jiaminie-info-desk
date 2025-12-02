import { NextRequest, NextResponse } from "next/server";
import { socialMediaAgent } from "@/lib/agent/ai_agent";
import { HumanMessage } from "@langchain/core/messages";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

const CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET || "my_consumer_secret";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const crcToken = searchParams.get("crc_token");

  if (crcToken) {
    console.log(`Verifying Twitter CRC: token=${crcToken}`);
    const hmac = crypto.createHmac("sha256", CONSUMER_SECRET).update(crcToken).digest("base64");
    return NextResponse.json({
      response_token: `sha256=${hmac}`,
    });
  }

  return new NextResponse("Bad Request", { status: 400 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Twitter sends different event types (tweet_create_events, direct_message_events, etc.)
    if (body.tweet_create_events) {
      for (const tweet of body.tweet_create_events) {
        if (tweet.user.id_str === "my_user_id") continue; // Ignore own tweets

        console.log("Received Tweet:", tweet.text);

        // 1. Save interaction
        const interaction = await prisma.socialMediaInteraction.create({
            data: {
              accountId: "twitter_account_id", // Lookup needed
              type: "MENTION", // or COMMENT depending on context
              direction: "INCOMING",
              content: tweet.text,
              fromUserId: tweet.user.id_str,
              fromUser: tweet.user.screen_name,
              platformId: tweet.id_str,
              metadata: tweet,
            },
          });

        // 2. Send to Agent
        await socialMediaAgent.invoke({
          messages: [
            new HumanMessage({
              content: `Received Tweet from @${tweet.user.screen_name}: "${tweet.text}". Interaction ID: ${interaction.id}. Please handle this.`,
            }),
          ],
        });
      }
    }

    // Handle Direct Messages
    if (body.direct_message_events) {
        // Implementation for DMs similar to above
    }

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("Error processing Twitter webhook:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
