export interface SessionResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
  success: boolean;
  message: string;
}

// export interface User {
//   id: string,
//   userId: string;
//   userStateId: number;
//   phoneNumber: string;
//   email: string;
//   identificationNumber: string;
//   identificationTypeId: number;
//   name: string;
//   lastName: string;
//   profileImageURL?: string;
// }

export interface ResponseLoginDto {
  accessToken: string;
  basicToken: string;
  user: User;
}

export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  roles: Role[];
}
export interface Role {
  id: string,
  name: string;
  description: string;
  permissions: Permissions;
}
export interface Permissions {
  allowedFields: AllowedFields;
}
export interface AllowedFields {
  products: string[];
}