import { Role } from "../../session/dtos/session.dto";

export interface Reseller {
    id: string,
    name: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    active?: boolean;
    lastConnection?: string;
    roles: Role[];
  }

export interface CreateUserDto {
    name: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    roles: string[];
  }

  export interface GetResellersResponseDto {
    resellers: Reseller[];
    total: number;
  }

  export interface GetResellerSingeResponseDto {
    user: Reseller;
  }
  
  export interface FilterGetResellersDto {
    page: number;
    limit?: number;
  }