// api/post.js

import { API_BASE_URL, handleApiResponse, createAuthHeaders } from './utils';

const POST_ENDPOINTS = {
  createPost: '/create_post',
  getPostById: (postId) => `/post/${postId}`,
  getPostsBySubreddit: (subredditname) => `/r/${subredditname}/posts`,
};

export const createPost = async (postData) => {
  const headers = createAuthHeaders();

  const response = await fetch(`${API_BASE_URL}${POST_ENDPOINTS.createPost}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(postData),
  });

  return handleApiResponse(response);
};

export const getPostById = async (postId) => {
  const headers = { 'Content-Type': 'application/json' };

  const response = await fetch(`${API_BASE_URL}${POST_ENDPOINTS.getPostById(postId)}`, {
    method: 'GET',
    headers: headers,
  });

  return handleApiResponse(response);
};

export const getPostsBySubreddit = async (subredditname) => {
  const headers = { 'Content-Type': 'application/json' };

  const response = await fetch(`${API_BASE_URL}${POST_ENDPOINTS.getPostsBySubreddit(subredditname)}`, {
    method: 'GET',
    headers: headers,
  });

  return handleApiResponse(response);
};
