import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from "axios";

let apiInstance: AxiosInstance | null = null;
let currentBaseURL: string | null = null;

const getBaseURL = (): string => {
  if (typeof window !== "undefined") {
    // Client-side: use external URL (accessible from browser)
    const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002/api";
    if (process.env.NODE_ENV === "development") {
      console.log("[API Client] Client-side baseURL:", url);
    }
    return url;
  }
  // Server-side: use Docker internal URL for server-to-server communication
  // Priority: API_URL (for Docker) > NEXT_PUBLIC_API_URL > localhost fallback
  const url =
    process.env.API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3002/api";
  
  if (process.env.NODE_ENV === "development") {
    console.log("[API Client] Server-side baseURL:", url);
    console.log("[API Client] Environment check:", {
      API_URL: process.env.API_URL,
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    });
  }
  
  return url;
};

const isConnectionError = (error: unknown): boolean => {
  if (axios.isAxiosError(error)) {
    const code = (error as AxiosError & { code?: string }).code;
    return (
      code === "ECONNRESET" ||
      code === "ECONNREFUSED" ||
      code === "ETIMEDOUT" ||
      code === "ENOTFOUND"
    );
  }
  return false;
};

export function createApiClient(baseURL?: string): AxiosInstance {
  const finalBaseURL = baseURL || getBaseURL();

  // Reset instance if baseURL changed (important for SSR)
  if (apiInstance && currentBaseURL !== finalBaseURL) {
    apiInstance = null;
    currentBaseURL = null;
  }

  if (apiInstance) {
    return apiInstance;
  }

  currentBaseURL = finalBaseURL;
  const isServerSide = typeof window === "undefined";

  apiInstance = axios.create({
    baseURL: finalBaseURL,
    timeout: 30000, // Increased timeout for Docker networking
    withCredentials: !isServerSide, // Only use credentials on client-side
    headers: {
      "Content-Type": "application/json",
    },
    // Retry configuration for connection errors
    validateStatus: (status) => status < 500, // Don't throw on 4xx errors
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

  // Response interceptor with retry logic for connection errors
  apiInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const config = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      // Retry logic for connection errors (only once)
      if (isConnectionError(error) && config && !config._retry) {
        config._retry = true;

        // Wait a bit before retry
        await new Promise((resolve) => setTimeout(resolve, 1000));

        try {
          return await apiInstance!.request(config);
        } catch (retryError) {
          // If retry also fails, provide better error message
          const baseURL = getBaseURL();
          console.error(
            `API connection failed to ${baseURL}${config.url}. ` +
              `Error: ${(error as AxiosError & { code?: string }).code || error.message}`
          );
          throw retryError;
        }
      }

      // Handle common errors
      if (error.response?.status === 401) {
        // Handle unauthorized
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          // Redirect to login if needed
        }
      }

      // Provide better error messages for connection issues
      if (isConnectionError(error)) {
        const baseURL = getBaseURL();
        const errorMessage = `Failed to connect to API at ${baseURL}. ` +
          `Please ensure the backend service is running and accessible. ` +
          `Error: ${(error as AxiosError & { code?: string }).code || error.message}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
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

// Reset function for testing or when environment changes
export function resetApiClient(): void {
  apiInstance = null;
  currentBaseURL = null;
}

