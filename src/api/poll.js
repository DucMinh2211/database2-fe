// api/poll.js

import { API_BASE_URL, handleApiResponse, createAuthHeaders } from './utils';

const POLL_ENDPOINTS = {
  getTopPollOptions: '/poll',
};

export const getTopPollOptions = async ({ poll_id, top_n = 2 }) => {
  const headers = { 'Content-Type': 'application/json' };

  const queryParams = new URLSearchParams({
    poll_id: String(poll_id),
    top_n: String(top_n),
  }).toString();

  const response = await fetch(`${API_BASE_URL}${POLL_ENDPOINTS.getTopPollOptions}?${queryParams}`, {
    method: 'GET',
    headers: headers,
  });

  return handleApiResponse(response);
};
