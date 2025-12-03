import { PrismaClient } from "@prisma/client";
import { socialMediaAgent } from "../lib/agent/ai_agent";
import { HumanMessage } from "@langchain/core/messages";
import { publishToFacebook } from "../lib/services/facebook";

const prisma = new PrismaClient();

async function recoverStaleEvents() {
  console.log("Checking for stale events...");
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  
  const staleEvents = await prisma.scheduledEvent.updateMany({
    where: {
      status: "PROCESSING",
      updatedAt: {
        lt: fiveMinutesAgo
      }
    },
    data: {
      status: "PENDING",
      error: "Recovered from stale state (worker crash?)"
    }
  });

  if (staleEvents.count > 0) {
    console.log(`Recovered ${staleEvents.count} stale events. Reset to PENDING.`);
  } else {
    console.log("No stale events found.");
  }
}

async function runWorker() {
  console.log("Worker started.");
  
  // Recover any events stuck in PROCESSING from a previous crash
  await recoverStaleEvents();

  console.log("Polling for events...");

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

      // --- MANAGER LOOP: Auto-schedule Planning Session ---
      // Check if we have a pending planning session. If not, and it's time (e.g., every 6 hours), schedule one.
      // For demo purposes, we'll just ensure there's always one pending if none exists in the future.
      const pendingPlanning = await prisma.scheduledEvent.findFirst({
        where: {
          type: "AGENT_TASK",
          status: "PENDING",
          payload: {
            path: ["task"],
            equals: "PLANNING SESSION"
          }
        }
      });

      if (!pendingPlanning) {
        // Schedule next planning session for 1 minute from now (for testing) or 6 hours
        // In production, maybe check if one was done recently.
        const lastPlanning = await prisma.scheduledEvent.findFirst({
            where: {
                type: "AGENT_TASK",
                status: "COMPLETED",
                payload: {
                    path: ["task"],
                    equals: "PLANNING SESSION"
                }
            },
            orderBy: { processedAt: "desc" }
        });

        const lastRun = lastPlanning?.processedAt || new Date(0);
        const hoursSinceLastRun = (now.getTime() - lastRun.getTime()) / (1000 * 60 * 60);

        if (hoursSinceLastRun > 6) { // Run every 6 hours
             console.log("Manager Loop: Scheduling new Planning Session...");
             await prisma.scheduledEvent.create({
                data: {
                    type: "AGENT_TASK",
                    payload: { task: "PLANNING SESSION" },
                    dueAt: new Date(now.getTime() + 1000 * 60), // 1 minute from now
                    status: "PENDING"
                }
             });
        }
      }
      // -----------------------------------------------------

      for (const event of events) {
        console.log(`Processing event ${event.id} of type ${event.type}`);

        // Update status to PROCESSING
        await prisma.scheduledEvent.update({
          where: { id: event.id },
          data: { status: "PROCESSING" },
        });

        try {


// ... inside runWorker loop ...

          if (event.type === "POST_PUBLISH") {
            // Logic to publish a scheduled post
            const payload = event.payload as any;
            const postId = payload.postId;
            
            const post = await prisma.socialMediaPost.findUnique({ where: { id: postId } });
            if (post) {
                console.log(`Publishing post ${postId} content: ${post.content}`);
                
                try {
                  const account = await prisma.socialMediaAccount.findUnique({
                    where: { id: post.accountId },
                  });

                  if (!account) throw new Error(`Account not found for post ${postId}`);
                  
                  const pageId = account.platformId;
                  const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

                  if (!accessToken) throw new Error("FACEBOOK_PAGE_ACCESS_TOKEN not configured");

                  // Use the service
                  const data = await publishToFacebook(pageId, post.content, accessToken);

                  await prisma.socialMediaPost.update({
                      where: { id: postId },
                      data: { 
                        status: "PUBLISHED", 
                        publishedAt: new Date(),
                        platformPostId: data.id,
                        metadata: data
                      }
                  });
                } catch (publishError) {
                  console.error("Failed to publish post:", publishError);
                  await prisma.socialMediaPost.update({
                    where: { id: postId },
                    data: { status: "FAILED", metadata: { error: String(publishError) } }
                  });
                  throw publishError; 
                }
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
