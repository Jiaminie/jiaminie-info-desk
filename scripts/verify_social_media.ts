import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function verifySystem() {
  console.log("Starting verification...");

  try {
    // 1. Check if we can connect to DB
    await prisma.$connect();
    console.log("Database connected successfully.");

    // 2. Create a mock account
    const account = await prisma.socialMediaAccount.create({
      data: {
        platform: "facebook",
        platformId: "mock_page_id",
        name: "Mock Page",
      },
    });
    console.log("Created mock account:", account.id);

    // 3. Simulate an incoming message (Webhook simulation)
    const interaction = await prisma.socialMediaInteraction.create({
      data: {
        accountId: account.id,
        type: "MESSAGE",
        direction: "INCOMING",
        content: "Hello, can you schedule a post for tomorrow?",
        fromUserId: "user_123",
      },
    });
    console.log("Created mock interaction:", interaction.id);

    // 4. Check if Agent would have picked it up (Manual check needed in logs)
    console.log("Please check agent logs to see if it processed interaction:", interaction.id);

    // 5. Create a scheduled event manually to test worker
    const event = await prisma.scheduledEvent.create({
      data: {
        type: "POST_PUBLISH",
        payload: { postId: "some_post_id" }, // Mock payload
        dueAt: new Date(Date.now() - 1000), // Due in the past
        status: "PENDING",
      },
    });
    console.log("Created scheduled event:", event.id);

    console.log("Verification setup complete. Run the worker to process the event.");

  } catch (error) {
    console.error("Verification failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

verifySystem();
