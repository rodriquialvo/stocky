import { Role } from "../../session/dtos/session.dto";

export interface Reseller {
    name: string;
    lastname: string;
    email: string;
    phone: string;
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
    reseller: Reseller;
  }
  
  export interface FilterGetResellersDto {
    page: number;
    limit?: number;
  }