import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/types/auth.type";
import fetcher from "@/utils/fetcher";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await fetcher.post<LoginResponse>("/auth/login", {
    body: data,
  });
  return response;
};

export const register = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  const response = await fetcher.post<RegisterResponse>("/auth/register", {
    body: data,
  });
  return response;
};

export const getMe = async (): Promise<LoginResponse> => {
  const response = await fetcher.get<LoginResponse>("/auth/me");
  return response;
};

export const refreshToken = async (): Promise<LoginResponse> => {
  const response = await fetcher.post<LoginResponse>("/auth/refresh", {});
  return response;
};

export const logout = async (): Promise<void> => {
  await fetcher.post("/auth/logout", {});
};
