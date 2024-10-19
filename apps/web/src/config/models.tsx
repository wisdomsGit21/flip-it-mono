export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  email: string;
  id: number;
  isGoogleAccount: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    email: string;
  };
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export type User = {
  email: string;
  id: number;
};
