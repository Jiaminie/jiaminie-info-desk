import { PrismaClient } from "@prisma/client";
import { socialMediaAgent } from "../lib/agent/ai_agent";
import { HumanMessage } from "@langchain/core/messages";

const prisma = new PrismaClient();

async function runWorker() {
  console.log("Worker started. Polling for events...");

  while (true) {
    try {
      const now = new Date();
      
      // 1. Fetch pending events due now or in the past
      const events = await prisma.scheduledEvent.findMany({
        where: {
          status: "PENDING",
          dueAt: {
            lte: now,
          },
        },
        take: 10, // Process in batches
      });

      for (const event of events) {
        console.log(`Processing event ${event.id} of type ${event.type}`);

        // Update status to PROCESSING
        await prisma.scheduledEvent.update({
          where: { id: event.id },
          data: { status: "PROCESSING" },
        });

        try {
          if (event.type === "POST_PUBLISH") {
            // Logic to publish a scheduled post
            const payload = event.payload as any;
            const postId = payload.postId;
            
            const post = await prisma.socialMediaPost.findUnique({ where: { id: postId } });
            if (post) {
                // Call platform API to publish
                console.log(`Publishing post ${postId} content: ${post.content}`);
                // await publishToPlatform(post);
                
                await prisma.socialMediaPost.update({
                    where: { id: postId },
                    data: { status: "PUBLISHED", publishedAt: new Date() }
                });
            }

          } else if (event.type === "AGENT_TASK") {
            // Trigger agent to do something
            const payload = event.payload as any;
            const taskDescription = payload.task;
            
            console.log(`Triggering agent for task: ${taskDescription}`);
            
            await socialMediaAgent.invoke({
                messages: [
                    new HumanMessage({
                        content: `Scheduled Task: ${taskDescription}. Please execute this task now.`,
                    })
                ]
            });
          }

          // Mark as COMPLETED
          await prisma.scheduledEvent.update({
            where: { id: event.id },
            data: { 
                status: "COMPLETED",
                processedAt: new Date()
            },
          });

        } catch (err) {
          console.error(`Error processing event ${event.id}:`, err);
          // Mark as FAILED or retry logic
          await prisma.scheduledEvent.update({
            where: { id: event.id },
            data: { 
                status: "FAILED",
                error: String(err)
            },
          });
        }
      }

      // Sleep for a bit if no events found to avoid hammering DB
      if (events.length === 0) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }

    } catch (error) {
      console.error("Worker loop error:", error);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}

// Run the worker
runWorker().catch((err) => {
  console.error("Fatal worker error:", err);
  process.exit(1);
});
