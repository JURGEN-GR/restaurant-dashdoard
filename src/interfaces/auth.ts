export interface AuthenticatedUser {
  uid: string;
  name: string;
}

export interface AuthState {
  checking?: boolean;
  user: AuthenticatedUser | null;
}
