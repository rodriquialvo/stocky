import { Role } from "../../session/dtos/session.dto";

export interface Customer {
    id: string,
    name: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    active?: boolean;
    lastConnection?: string;
    roles: Role[];
    dni?: string;
  }

export interface CreateUserDto {
    name: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    roles: string[];
    dni?: string;
  }

  export interface GetResellersResponseDto {
    customers: Customer[];
    total: number;
  }

  export interface GetResellerSingeResponseDto {
    user: Customer;
  }
  
  export interface FilterGetResellersDto {
    page: number;
    limit?: number;
  }