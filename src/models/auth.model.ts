import { User } from "./user.model";

export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export interface LoginResponse {
  user: User;
  tokens: Tokens;
}

export interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
