// api/comment.js

import { API_BASE_URL, handleApiResponse, createAuthHeaders } from './utils';

const COMMENT_ENDPOINTS = {
  createComment: '/create_comment',
  getCommentsByPostId: (postId) => `/post/${postId}/comments`,
};

export const createComment = async (commentData) => {
  const headers = createAuthHeaders();

  const response = await fetch(`${API_BASE_URL}${COMMENT_ENDPOINTS.createComment}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(commentData),
  });

  return handleApiResponse(response);
};

export const getCommentsByPostId = async (postId) => {
  const headers = { 'Content-Type': 'application/json' };

  const response = await fetch(`${API_BASE_URL}${COMMENT_ENDPOINTS.getCommentsByPostId(postId)}`, {
    method: 'GET',
    headers: headers,
  });

  return handleApiResponse(response);
};
