export interface SessionResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
  success: boolean;
  message: string;
}

export interface User {
  id: string,
  userId: string;
  userStateId: number;
  phoneNumber: string;
  email: string;
  identificationNumber: string;
  identificationTypeId: number;
  name: string;
  lastName: string;
  profileImageURL?: string;
}
