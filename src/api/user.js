// api/utils.js

export const API_BASE_URL = '/api';

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const handleApiResponse = async (response) => {
  if (!response.ok) {
    let errorDetail = `API request failed with status ${response.status}`;
    let errorData = null;

    try {
      const jsonResponse = response.clone();
      errorData = await jsonResponse.json();
      errorDetail = errorData.detail || errorData.message || errorDetail;
    } catch (parseError) {
      try {
        const textResponse = response.clone();
        const textError = await textResponse.text();
        errorDetail = textError || errorDetail;
      } catch (readError) {
        errorDetail = `${response.status} ${response.statusText}`;
      }
    }

    const error = new Error(`Lỗi API (${response.status}): ${errorDetail}`);
    error.status = response.status;
    error.responseData = errorData;
    throw error;
  }

  if (response.status === 204) {
    return null;
  }

  try {
    return response.json();
  } catch (parseError) {
    throw new Error(`Lỗi parse JSON phản hồi: ${parseError.message}`);
  }
};

export const createAuthHeaders = (headers = {}) => {
  const token = getAuthToken();
  const authHeader = token ? { 'Authorization': `Bearer ${token}` } : {};
  return {
    'Content-Type': 'application/json',
    ...authHeader,
    ...headers,
  };
};
