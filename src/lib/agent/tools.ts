import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { replyToFacebookComment } from "../services/facebook";

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



// ... inside replyToCommentTool ...

      const platformId = originalInteraction.platformId;
      const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

      if (!platformId) {
        return "Original interaction has no platform ID to reply to.";
      }

      if (!accessToken) {
        return "FACEBOOK_PAGE_ACCESS_TOKEN is not configured.";
      }

      // 2. Call Facebook Graph API to send the reply via Service
      let newPlatformId: string;
      let responseData: any;

      try {
        const data = await replyToFacebookComment(platformId, content, accessToken);
        newPlatformId = data.id || "";
        if (!newPlatformId) {
             throw new Error("Facebook API response missing ID");
        }
        responseData = data;
      } catch (apiError) {
        console.error("Facebook API Error:", apiError);
        return `Failed to send reply to Facebook: ${apiError}`;
      }

      // 3. Create the reply interaction in DB
      const reply = await prisma.socialMediaInteraction.create({
        data: {
          accountId: originalInteraction.accountId,
          type: "REPLY",
          direction: "OUTGOING",
          content,
          platformId: newPlatformId,
          metadata: responseData,
        },
      });

      return `Reply sent and saved successfully: ${reply.id}`;
    } catch (error) {
      console.error("Error in replyToCommentTool:", error);
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

export const getPostAnalyticsTool = tool(
  async ({ limit = 5 }) => {
    try {
      const posts = await prisma.socialMediaPost.findMany({
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          interactions: true,
        },
      });

      const analytics = posts.map((post) => {
        const likes = post.interactions.filter((i) => i.type === "LIKE").length;
        const comments = post.interactions.filter((i) => i.type === "COMMENT").length;
        const shares = post.interactions.filter((i) => i.type === "OTHER" && i.metadata && (i.metadata as any).item === "share").length; // Example logic

        return {
          id: post.id,
          content: post.content.substring(0, 50) + "...",
          status: post.status,
          publishedAt: post.publishedAt,
          likes,
          comments,
          shares,
          totalInteractions: post.interactions.length,
        };
      });

      return JSON.stringify(analytics, null, 2);
    } catch (error) {
      return `Failed to fetch analytics: ${error}`;
    }
  },
  {
    name: "getPostAnalytics",
    description: "Get performance analytics for recent posts (likes, comments, etc.).",
    schema: z.object({
      limit: z.number().optional().describe("Number of recent posts to analyze (default: 5)"),
    }),
  }
);
