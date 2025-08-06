// lib/fetcher.ts

export interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

export async function fetcher<T = unknown>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const config: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      credentials: "include",
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  const res = await fetch(url, config);

  const contentType = res.headers.get("content-type");
  const isJson = contentType?.includes("application/json");

  const data: unknown = isJson ? await res.json() : null;

  if (!res.ok) {
    // Safely access `.message` only if it's an object
    const message =
      typeof data === "object" && data !== null && "message" in data
        ? String((data as { message?: string }).message)
        : res.statusText;

    throw new Error(message || "Unknown error");
  }

  return data as T;
}
