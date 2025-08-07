export type LoginRequest = {
  email: string;
  password?: string;
};

export type LoginResponse = {
  id: string;
  username: string;
  email: string;
};

export type RegisterRequest = {
  username: string;
  email: string;
  password?: string;
};

export type RegisterResponse = {
  id: string;
  username: string;
  email: string;
};

