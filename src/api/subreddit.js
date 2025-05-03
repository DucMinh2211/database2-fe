// api/subreddit.js

import { API_BASE_URL, handleApiResponse, createAuthHeaders } from './utils';

const SUBREDDIT_ENDPOINTS = {
  createSubreddit: '/create_subreddit',
  analyzeSubreddits: '/analyze_subreddits',
  userContributions: (subredditname) => `/user_contributions/${subredditname}`,
};

export const createSubreddit = async (subredditData) => {
  const headers = createAuthHeaders();

  const response = await fetch(`${API_BASE_URL}${SUBREDDIT_ENDPOINTS.createSubreddit}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(subredditData),
  });

  return handleApiResponse(response);
};

export const analyzeSubreddits = async ({ start_date, end_date, min_engagement }) => {
  const headers = { 'Content-Type': 'application/json' };

  const queryParams = new URLSearchParams({
    start_date,
    end_date,
    min_engagement: String(min_engagement),
  }).toString();

  const response = await fetch(`${API_BASE_URL}${SUBREDDIT_ENDPOINTS.analyzeSubreddits}?${queryParams}`, {
    method: 'GET',
    headers: headers,
  });

  return handleApiResponse(response);
};

export const getUserContributionsInSubreddit = async (subredditname) => {
  const headers = { 'Content-Type': 'application/json' };

  const response = await fetch(`${API_BASE_URL}${SUBREDDIT_ENDPOINTS.userContributions(subredditname)}`, {
    method: 'GET',
    headers: headers,
  });

  return handleApiResponse(response);
};
