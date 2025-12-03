import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Creating test post...");

  // 1. Get or Create Account
  // We need a valid Page ID here. 
  // If we have one in DB, use it. Otherwise, we might fail if we don't know the Page ID.
  // Let's assume the user has at least one account from the webhook events.
  let account = await prisma.socialMediaAccount.findFirst({
    where: { platformId: "881680428365160" }
  });

  if (!account) {
    console.log("No Facebook account found in DB. Please ensure you have received at least one webhook event or manually add an account.");
    // Try to use a placeholder if we really have to, but it won't work for real API calls without a real Page ID.
    // Let's try to fetch one from the user's previous logs if possible, or just fail.
    // From logs: 881680428365160 seems to be the Page ID (Jiaminie).
    console.log("Creating default account with ID 881680428365160 (Jiaminie)...");
    account = await prisma.socialMediaAccount.create({
      data: {
        platform: "facebook",
        platformId: "881680428365160",
        name: "Jiaminie Info Desk",
      }
    });
  }

  console.log(`Using account: ${account.name} (${account.platformId})`);

  // 2. Create Post
  const post = await prisma.socialMediaPost.create({
    data: {
      accountId: account.id,
      content: `Hello world! This is a test post from the automation system. Time: ${new Date().toISOString()}`,
      status: "SCHEDULED",
      scheduledFor: new Date(),
    }
  });

  console.log(`Created post: ${post.id}`);

  // 3. Create Scheduled Event
  const event = await prisma.scheduledEvent.create({
    data: {
      type: "POST_PUBLISH",
      payload: { postId: post.id },
      dueAt: new Date(),
      status: "PENDING",
    }
  });

  console.log(`Created scheduled event: ${event.id}`);
  console.log("Now run the worker to process this event.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
