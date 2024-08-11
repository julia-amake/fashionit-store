export interface SessionProfile {
  id: string;
  name?: string;
  email: string;
  password: string;
  signUpDate: string;
  commandId: string;
}

export interface SessionResponse {
  profile: SessionProfile;
  token: string;
}

export interface SessionSchema {
  token: string;
  isLoading?: boolean;
  error?: string;
}
