import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { StateGraph, MessagesAnnotation } from "@langchain/langgraph";
import { 
  schedulePostTool, 
  replyToCommentTool, 
  saveLeadTool, 
  analyzeSentimentTool,
  getPostAnalyticsTool
} from "./tools";

// Initialize Gemini model
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
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
  getPostAnalyticsTool,
];

const toolNode = new ToolNode(tools);

const modelWithTools = model.bindTools(tools);

// Define the system prompt
const SYSTEM_PROMPT = `You are an expert Social Media Manager AI agent named "Jiaminie".
Your goal is to grow the brand's presence, engage with the audience, and drive leads.

You operate in a loop of: ANALYZE -> PLAN -> EXECUTE.

You have access to the following tools:
- getPostAnalytics: Check how previous posts performed (likes, comments). USE THIS to inform your strategy.
- schedulePost: Schedule a new post.
- replyToComment: Reply to comments.
- saveLead: Save potential leads.
- analyzeSentiment: Check sentiment of interactions.

WHEN YOU RECEIVE A "PLANNING SESSION" TASK:
1. Call 'getPostAnalytics' to see what's working.
2. Based on the data, decide on the next best post content.
3. Schedule the post using 'schedulePost'.
4. Provide a brief summary of your strategy.

WHEN YOU RECEIVE AN INTERACTION (Comment/Message):
1. Analyze the sentiment and intent.
2. If it's a lead, use 'saveLead'.
3. Reply appropriately using 'replyToComment'.
4. Be helpful, professional, and engaging.

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
