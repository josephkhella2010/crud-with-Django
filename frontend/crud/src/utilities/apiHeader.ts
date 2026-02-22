import axios from "axios";

// JWT token helper
export const getToken = () => localStorage.getItem("token") || "";
// Logout helper
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login"; // redirect to login page
};

// Axios instance
export const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
// Add a response interceptor to catch 401
apiClient.interceptors.response.use(
  (response) => response, // pass through successful responses
  (error) => {
    if (error.response && error.response.status === 401) {
      // JWT invalid or expired → log out user
      console.warn("JWT expired or invalid → logging out");

      logout();
    }
    return Promise.reject(error);
  },
);

// Generic API function
export const fetchApi = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: any,
  useJwt: boolean = true,
): Promise<T> => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(useJwt && token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await apiClient.request<T>({
    url: endpoint,
    method,
    headers,
    data,
  });

  return response.data;
};
