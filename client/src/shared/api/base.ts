import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

let apiInstance: AxiosInstance | null = null;

const getBaseURL = (): string => {
  if (typeof window !== "undefined") {
    // Client-side: use external URL (accessible from browser)
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002/api";
  }
  // Server-side: use Docker internal URL for server-to-server communication
  return process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002/api";
};

export function createApiClient(baseURL?: string): AxiosInstance {
  if (apiInstance) {
    return apiInstance;
  }

  const finalBaseURL = baseURL || getBaseURL();

  apiInstance = axios.create({
    baseURL: finalBaseURL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request interceptor
  apiInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Add auth token if available
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  apiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle common errors
      if (error.response?.status === 401) {
        // Handle unauthorized
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          // Redirect to login if needed
        }
      }
      return Promise.reject(error);
    }
  );

  return apiInstance;
}

export function getApiClient(): AxiosInstance {
  if (!apiInstance) {
    return createApiClient();
  }
  return apiInstance;
}

