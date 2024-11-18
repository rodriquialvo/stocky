import { ApiUserService } from './api-user.service';
import { CreateUserDto, FilterGetResellersDto, GetResellerSingeResponseDto, GetResellersResponseDto, Reseller } from './dtos/generic';

export interface UserService {
  getUsers: (filter: FilterGetResellersDto) => Promise<GetResellersResponseDto>,
  createUser: (user: CreateUserDto) => Promise<GetResellerSingeResponseDto>,
  updateUser: (id: string, user: Partial<Reseller>) => Promise<GetResellerSingeResponseDto>,
}

export const useAPIUserService = (): UserService => {
  return new ApiUserService();
};
