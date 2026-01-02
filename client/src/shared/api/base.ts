import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

let apiInstance: AxiosInstance | null = null;

export function createApiClient(baseURL: string = "/api"): AxiosInstance {
  if (apiInstance) {
    return apiInstance;
  }

  apiInstance = axios.create({
    baseURL,
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

