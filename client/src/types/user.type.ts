export interface IAccount {
  id: string;
  userId: string;
  provider: string;
  providerAccountId: string;
  accessToken?: string | null;
  refreshToken?: string | null;
  expiresAt?: number | null;
  tokenType?: string | null;
  scope?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  hashedPassword: string;
  providers: string[];
  createdAt: Date;
  updatedAt: Date;
  accounts?: IAccount[];
}

export interface ICreateUserDto {
  username: string;
  email: string;
  hashedPassword: string;
  providers?: string[];
}

export interface IUpdateUserDto {
  username?: string;
  email?: string;
  hashedPassword?: string;
  providers?: string[];
}
