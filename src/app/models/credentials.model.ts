export interface Credentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  birthDate: string;
}

export interface UserResponse {
  userId: number;
  username: string;
  email: string;
}
