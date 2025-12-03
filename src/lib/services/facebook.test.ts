import { describe, it, expect, vi, beforeEach } from 'vitest';
import { publishToFacebook, replyToFacebookComment } from './facebook';

// Mock global fetch
global.fetch = vi.fn();

describe('Facebook Service', () => {
  const mockAccessToken = 'mock_access_token';
  const mockPageId = '123456789';
  const mockCommentId = '987654321';
  const mockContent = 'Test content';

  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('publishToFacebook', () => {
    it('should publish a post successfully', async () => {
      const mockResponse = { id: 'new_post_id_123' };
      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await publishToFacebook(mockPageId, mockContent, mockAccessToken);

      expect(global.fetch).toHaveBeenCalledWith(
        `https://graph.facebook.com/v24.0/${mockPageId}/feed`,
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: mockContent,
            access_token: mockAccessToken,
          }),
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error if API call fails', async () => {
      const mockErrorResponse = { error: { message: 'API Error' } };
      (global.fetch as any).mockResolvedValue({
        ok: false,
        json: async () => mockErrorResponse,
      });

      await expect(publishToFacebook(mockPageId, mockContent, mockAccessToken))
        .rejects.toThrow('Facebook API Error: API Error');
    });
  });

  describe('replyToFacebookComment', () => {
    it('should reply to a comment successfully', async () => {
      const mockResponse = { id: 'new_comment_id_456' };
      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await replyToFacebookComment(mockCommentId, mockContent, mockAccessToken);

      expect(global.fetch).toHaveBeenCalledWith(
        `https://graph.facebook.com/v24.0/${mockCommentId}/comments`,
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: mockContent,
            access_token: mockAccessToken,
          }),
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error if API call fails', async () => {
      const mockErrorResponse = { error: { message: 'API Error' } };
      (global.fetch as any).mockResolvedValue({
        ok: false,
        json: async () => mockErrorResponse,
      });

      await expect(replyToFacebookComment(mockCommentId, mockContent, mockAccessToken))
        .rejects.toThrow('Facebook API Error: API Error');
    });
  });
});
