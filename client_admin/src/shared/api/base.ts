import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

let apiInstance: AxiosInstance | null = null;

export interface ApiError {
  message: string;
  status?: number;
  data?: unknown;
}

export function createApiClient(baseURL?: string): AxiosInstance {
  if (apiInstance) {
    return apiInstance;
  }

  // In development, use proxy path (/api) which Vite will proxy to the server
  // In production Docker, use nginx proxy (/api) which forwards to backend
  // VITE_API_URL can override this behavior
  const isDevelopment = import.meta.env.DEV;
  const apiBaseURL =
    baseURL ||
    (import.meta.env.VITE_API_URL
      ? `${import.meta.env.VITE_API_URL}/api`
      : "/api"); // Use proxy in both dev and prod (Vite dev server or nginx)

  console.log(import.meta.env.VITE_API_URL);

  // Debug logging (remove in production)
  if (isDevelopment) {
    console.log("[API Client] Base URL:", apiBaseURL);
    console.log("[API Client] VITE_API_URL:", import.meta.env.VITE_API_URL);
  }

  apiInstance = axios.create({
    baseURL: apiBaseURL,
    timeout: 10000,
    withCredentials: true, // Important for CORS with credentials
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request interceptor
  apiInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("admin_token")
          : null;
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
    (error: AxiosError<{ message?: string }>) => {
      if (error.response?.status === 401) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("admin_token");
          localStorage.removeItem("admin_login");
        }
      }

      // Create a more structured error
      const apiError: ApiError = {
        message:
          error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred",
        status: error.response?.status,
        data: error.response?.data,
      };

      return Promise.reject(apiError);
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

export function resetApiClient(): void {
  apiInstance = null;
}
