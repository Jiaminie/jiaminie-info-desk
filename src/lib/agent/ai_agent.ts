import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { StateGraph, MessagesAnnotation } from "@langchain/langgraph";
import { 
  schedulePostTool, 
  replyToCommentTool, 
  saveLeadTool, 
  analyzeSentimentTool 
} from "./tools";

// Initialize Gemini model
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0",
  temperature: 0.7,
  maxOutputTokens: 2048,
  apiKey: process.env.GOOGLE_API_KEY || "dummy_key_for_build",
});

// Define tools
const tools = [
  schedulePostTool,
  replyToCommentTool,
  saveLeadTool,
  analyzeSentimentTool,
];

const toolNode = new ToolNode(tools);

const modelWithTools = model.bindTools(tools);

// Define the system prompt
const SYSTEM_PROMPT = `You are an expert Social Media Manager AI agent. 
Your goal is to manage social media accounts effectively, engaging with the audience, scheduling posts, and identifying potential leads.

You have access to the following tools:
- schedulePost: Schedule a new post for a specific platform.
- replyToComment: Reply to a comment on a post.
- saveLead: Save a user as a potential lead if they show interest.
- analyzeSentiment: Analyze the sentiment of a message or comment.

When you receive an event (message, comment, etc.), analyze it and decide the best course of action.
- If it's a question, answer it or schedule a reply.
- If it's a positive comment, thank the user.
- If it's a negative comment, address it professionally.
- If a user shows interest in products/services, save them as a lead.
- If asked to post something, schedule it.

Always be polite, professional, and helpful.
Current time: ${new Date().toISOString()} (EAT)
`;

// Define the function that calls the model
async function callModel(state: typeof MessagesAnnotation.State) {
  const messages = state.messages;
  const response = await modelWithTools.invoke([
    new SystemMessage(SYSTEM_PROMPT),
    ...messages,
  ]);
  return { messages: [response] };
}

// Define the graph
const workflow = new StateGraph(MessagesAnnotation)
  .addNode("agent", callModel)
  .addNode("tools", toolNode)
  .addEdge("__start__", "agent")
  .addConditionalEdges("agent", shouldContinue)
  .addEdge("tools", "agent");

function shouldContinue(state: typeof MessagesAnnotation.State) {
  const messages = state.messages;
  const lastMessage = messages[messages.length - 1];

  if (
    lastMessage && 
    "tool_calls" in lastMessage && 
    Array.isArray(lastMessage.tool_calls) && 
    lastMessage.tool_calls.length > 0
  ) {
    return "tools";
  }
  return "__end__";
}

export const socialMediaAgent = workflow.compile();
