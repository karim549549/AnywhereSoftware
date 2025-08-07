// lib/fetcher.ts

import { store } from "@/store/store";
import { setUser } from "@/store/userSlice";
import { showGlobalError } from "@/store/errorSlice";
import { refreshToken as callRefreshToken } from "@/apis/api";

export interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

export class SessionExpiredError extends Error {
  constructor(message = "Session expired. Please log in again.") {
    super(message);
    this.name = "SessionExpiredError";
  }
}

let isRefreshing = false;
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: unknown | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(true);
    }
  });
  failedQueue = [];
};

async function baseFetcher<T = unknown>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000"; // Default to localhost:4000 if not set
  const fullUrl = `${baseUrl}${url}`;

  const config: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      credentials: "include",
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  let res = await fetch(fullUrl, config);

  const contentType = res.headers.get("content-type");
  const isJson = contentType?.includes("application/json");

  let data: unknown = isJson ? await res.json() : null;

  if (!res.ok) {
    const message =
      typeof data === "object" && data !== null && "message" in data
        ? String((data as { message?: string }).message)
        : res.statusText;

    // Handle 401 Unauthorized
    if (
      res.status === 401 &&
      url !== `${baseUrl}/auth/refresh` &&
      url !== `${baseUrl}/auth/login`
    ) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshResponse = await callRefreshToken();
          store.dispatch(setUser(refreshResponse));
          isRefreshing = false;
          processQueue(null);

          // Retry the original request
          res = await fetch(fullUrl, config);
          data = isJson ? await res.json() : null;
          if (!res.ok) {
            throw new Error(message || "Unknown error after retry");
          }
          return data as T;
        } catch (refreshError: unknown) {
          isRefreshing = false;
          processQueue(refreshError);
          throw new SessionExpiredError();
        }
      } else {
        // If a refresh is already in progress, queue the request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => baseFetcher<T>(url, options));
      }
    }

    // Dispatch global error for non-401 errors
    if (res.status !== 401) {
      store.dispatch(showGlobalError(message));
    }

    throw new Error(message || "Unknown error");
  }

  return data as T;
}

const fetcher = {
  get: <T = unknown>(url: string, options?: RequestOptions) =>
    baseFetcher<T>(url, { ...options, method: "GET" }),
  post: <T = unknown>(url: string, options?: RequestOptions) =>
    baseFetcher<T>(url, { ...options, method: "POST" }),
  put: <T = unknown>(url: string, options?: RequestOptions) =>
    baseFetcher<T>(url, { ...options, method: "PUT" }),
  delete: <T = unknown>(url: string, options?: RequestOptions) =>
    baseFetcher<T>(url, { ...options, method: "DELETE" }),
};

export default fetcher;
