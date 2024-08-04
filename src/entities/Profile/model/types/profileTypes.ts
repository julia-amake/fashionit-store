export interface Profile {
  id: string;
  name: string;
  email: string;
  signUpDate: string;
  commandId: string;
}

export interface ProfileRequest {
  name: string;
}

export interface User {
  id: string;
  name: string;
  commandId: string;
}
