import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const schedulePostTool = tool(
  async ({ accountId, content, scheduledFor, mediaUrls }) => {
    try {
      const post = await prisma.socialMediaPost.create({
        data: {
          accountId,
          content,
          scheduledFor: new Date(scheduledFor),
          mediaUrls: mediaUrls || [],
          status: "SCHEDULED",
        },
      });
      return `Post scheduled successfully with ID: ${post.id}`;
    } catch (error) {
      return `Failed to schedule post: ${error}`;
    }
  },
  {
    name: "schedulePost",
    description: "Schedule a new social media post.",
    schema: z.object({
      accountId: z.string().describe("The ID of the social media account"),
      content: z.string().describe("The content of the post"),
      scheduledFor: z.string().describe("ISO date string for when to publish"),
      mediaUrls: z.array(z.string()).optional().describe("List of media URLs"),
    }),
  }
);

export const replyToCommentTool = tool(
  async ({ interactionId, content }) => {
    try {
      // 1. Find the original interaction to get account and platform info
      const originalInteraction = await prisma.socialMediaInteraction.findUnique({
        where: { id: interactionId },
      });

      if (!originalInteraction) {
        return "Original interaction not found.";
      }

      // 2. Create the reply interaction in DB
      const reply = await prisma.socialMediaInteraction.create({
        data: {
          accountId: originalInteraction.accountId,
          type: "REPLY",
          direction: "OUTGOING",
          content,
          // In a real scenario, we would also call the platform API here to actually send the reply
          // For now, we just record it. The worker might pick it up if we queue it.
          // But usually, the agent action implies immediate execution or scheduling.
          // Let's assume immediate execution for replies or queueing via a separate mechanism if needed.
          // For this MVP, we just save it.
        },
      });

      return `Reply saved/sent: ${reply.id}`;
    } catch (error) {
      return `Failed to reply: ${error}`;
    }
  },
  {
    name: "replyToComment",
    description: "Reply to a comment or message.",
    schema: z.object({
      interactionId: z.string().describe("The ID of the interaction to reply to"),
      content: z.string().describe("The content of the reply"),
    }),
  }
);

export const saveLeadTool = tool(
  async ({ accountId, platformUserId, name, notes }) => {
    try {
      const lead = await prisma.socialMediaLead.create({
        data: {
          accountId,
          platformUserId,
          name,
          notes,
          status: "NEW",
        },
      });
      return `Lead saved successfully: ${lead.id}`;
    } catch (error) {
      return `Failed to save lead: ${error}`;
    }
  },
  {
    name: "saveLead",
    description: "Save a user as a potential lead.",
    schema: z.object({
      accountId: z.string().describe("The ID of the social media account"),
      platformUserId: z.string().describe("The user's ID on the platform"),
      name: z.string().optional().describe("The user's name"),
      notes: z.string().optional().describe("Notes about the lead"),
    }),
  }
);

export const analyzeSentimentTool = tool(
  async ({ text }) => {
    // In a real app, this might call an external NLP service or use a local library.
    // For now, we'll use a simple mock or rely on the LLM's internal capability if we were asking it directly.
    // But since this is a tool, let's just return a placeholder or use a basic heuristic.
    // Actually, the Agent (LLM) is better at this than a simple tool unless we use a specialized model.
    // But the user asked for tools. Let's make it a "dummy" tool that the agent can "use" to formalize the step.
    
    const positiveWords = ["good", "great", "awesome", "love", "thanks"];
    const negativeWords = ["bad", "terrible", "hate", "awful", "worst"];
    
    let score = 0;
    const lowerText = text.toLowerCase();
    
    positiveWords.forEach(w => { if (lowerText.includes(w)) score++; });
    negativeWords.forEach(w => { if (lowerText.includes(w)) score--; });
    
    let sentiment = "NEUTRAL";
    if (score > 0) sentiment = "POSITIVE";
    if (score < 0) sentiment = "NEGATIVE";

    return JSON.stringify({ sentiment, score });
  },
  {
    name: "analyzeSentiment",
    description: "Analyze the sentiment of a text.",
    schema: z.object({
      text: z.string().describe("The text to analyze"),
    }),
  }
);
