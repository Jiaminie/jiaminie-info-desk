import { NextRequest, NextResponse } from "next/server";
import { socialMediaAgent } from "@/lib/agent/ai_agent";
import { HumanMessage } from "@langchain/core/messages";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "my_secure_token";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode && token) {
    console.log(`Verifying WhatsApp webhook: mode=${mode}, token=${token}, expected=${VERIFY_TOKEN}`);
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WHATSAPP_WEBHOOK_VERIFIED");
      return new NextResponse(challenge, { status: 200 });
    } else {
      console.log("WHATSAPP_WEBHOOK_VERIFICATION_FAILED: Token mismatch");
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  return new NextResponse("Bad Request", { status: 400 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.object === "whatsapp_business_account") {
      for (const entry of body.entry) {
        for (const change of entry.changes) {
          const value = change.value;
          if (value.messages && value.messages.length > 0) {
            const message = value.messages[0];
            const senderId = message.from;
            const messageBody = message.text ? message.text.body : "";

            console.log("Received WhatsApp message:", messageBody);

             // 1. Save interaction
             const interaction = await prisma.socialMediaInteraction.create({
                data: {
                  accountId: "whatsapp_account_id", // Lookup needed
                  type: "MESSAGE",
                  direction: "INCOMING",
                  content: messageBody,
                  fromUserId: senderId,
                  platformId: message.id,
                  metadata: value,
                },
              });

            // 2. Send to Agent
            await socialMediaAgent.invoke({
              messages: [
                new HumanMessage({
                  content: `Received WhatsApp message from ${senderId}: "${messageBody}". Interaction ID: ${interaction.id}. Please handle this.`,
                }),
              ],
            });
          }
        }
      }
      return new NextResponse("EVENT_RECEIVED", { status: 200 });
    } else {
      return new NextResponse("Not Found", { status: 404 });
    }
  } catch (error) {
    console.error("Error processing WhatsApp webhook:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
