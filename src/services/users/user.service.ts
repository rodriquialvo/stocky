import { ApiUserService } from './api-user.service';
import { CreateUserDto, FilterGetResellersDto, GetResellerSingeResponseDto, GetResellersResponseDto } from './dtos/generic';

export interface UserService {
  getUsers: (filter: FilterGetResellersDto) => Promise<GetResellersResponseDto>,
  createUser: (user: CreateUserDto) => Promise<GetResellerSingeResponseDto>,
}

export const useAPIUserService = (): UserService => {
  return new ApiUserService();
};
