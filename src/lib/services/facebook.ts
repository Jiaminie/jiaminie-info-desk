const FACEBOOK_API_VERSION = "v24.0";
const FACEBOOK_GRAPH_URL = "https://graph.facebook.com";

interface FacebookAPIResponse {
  id?: string;
  error?: {
    message: string;
    type: string;
    code: number;
    fbtrace_id: string;
  };
  [key: string]: any;
}

/**
 * Publishes a post to a Facebook Page.
 * @param pageId The ID of the Facebook Page.
 * @param content The text content of the post.
 * @param accessToken The Page Access Token.
 * @returns The response from the Facebook API (containing the new post ID).
 */
export async function publishToFacebook(
  pageId: string,
  content: string,
  accessToken: string
): Promise<FacebookAPIResponse> {
  console.log(`[Facebook Service] Publishing to Page ${pageId}...`);
  
  const response = await fetch(`${FACEBOOK_GRAPH_URL}/${FACEBOOK_API_VERSION}/${pageId}/feed`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: content,
      access_token: accessToken,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Facebook API Error: ${data.error?.message || JSON.stringify(data)}`);
  }

  console.log(`[Facebook Service] Post published successfully. ID: ${data.id}`);
  return data;
}

/**
 * Replies to a comment on Facebook.
 * @param commentId The ID of the comment to reply to.
 * @param content The text content of the reply.
 * @param accessToken The Page Access Token.
 * @returns The response from the Facebook API (containing the new comment ID).
 */
export async function replyToFacebookComment(
  commentId: string,
  content: string,
  accessToken: string
): Promise<FacebookAPIResponse> {
  console.log(`[Facebook Service] Replying to comment ${commentId}...`);

  const response = await fetch(`${FACEBOOK_GRAPH_URL}/${FACEBOOK_API_VERSION}/${commentId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: content,
      access_token: accessToken,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Facebook API Error: ${data.error?.message || JSON.stringify(data)}`);
  }

  console.log(`[Facebook Service] Reply sent successfully. ID: ${data.id}`);
  return data;
}
