// api/auth.js

const API_BASE_URL = "/api";

const getAuthToken = () => {
  return localStorage.getItem("token");
};

const handleApiResponse = async (response) => {
  if (!response.ok) {
    let errorDetail = "Đã xảy ra lỗi.";
    try {
      const errorData = await response.json();
      errorDetail = errorData.detail || errorData.message || errorDetail;
    } catch (parseError) {
      try {
        const textError = await response.text();
        errorDetail = textError || "${resonse.status} ${response.statusText}";
      } catch (readError) {
        errorDetail = "${response.status} ${response.statusText}";
      }
    }
    throw new Error("Lỗi API (${resonse.status}): ${errorDetail}");
  }
  return response.json();
};

export const login = async ({ userName, password }) => {
  const response = await fetch("${API_BASE_URL}/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName, password }),
  });
  return handleApiResponse(response);
};

export const signup = async ({ userName, email, passwordHash }) => {
  const response = await fetch("${API_BASE_URL}/signup", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userName, email, passwordHash }),
  });
  return handleApiResponse(response);
}

export const fetchCurrentUser = async () => {
  const token = getAuthToken();
  if (!token) {
    console.log("No auth token found, cannot fetch user.");
    return null;
  }

  const response = await fetch("${API_BASE_URL}/auth/me", {
    method: "GET",
    headers: {
      "Authorization": "Bearer ${token}",
      "Content-Type": "application/json",
    },
  });

  if (response.status === 401 || response.status === 403) {
    console.error("Authentication failed, token invalid or expired.");
    localStorage.removeItem("token");
    return null;
  }

  return handleApiResponse(response);
};

export const logout = () => {
  localStorage.removeItem("token");
}
