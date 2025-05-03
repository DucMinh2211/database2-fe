// api/vote.js

import { API_BASE_URL, handleApiResponse, createAuthHeaders } from './utils';

const VOTE_ENDPOINTS = {
  submitVote: '/vote',
};

export const submitVote = async (voteData) => {
  const headers = createAuthHeaders();

  if (voteData.postid === undefined && voteData.commentid === undefined) {
    throw new Error("Vote data must include either postid or commentid.");
  }
  if (voteData.postid !== undefined && voteData.commentid !== undefined) {
    console.warn("Vote data includes both postid and commentid. Submitting vote for post.");
    delete voteData.commentid;
  }

  const response = await fetch(`${API_BASE_URL}${VOTE_ENDPOINTS.submitVote}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(voteData),
  });

  return handleApiResponse(response);
};
