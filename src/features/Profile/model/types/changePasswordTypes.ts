export interface ChangePasswordRequest {
  password: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
}
