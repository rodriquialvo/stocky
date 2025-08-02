import { ApiUserService } from './api-user.service';
import { CreateUserDto, FilterGetResellersDto, GetResellerSingeResponseDto, GetResellersResponseDto, Customer } from './dtos/generic';
import { registerBody, ResponseRegisterDto } from './dtos/register.dto';

export interface UserService {
  getUsers: (filter: FilterGetResellersDto) => Promise<GetResellersResponseDto>,
  createUser: (user: CreateUserDto) => Promise<GetResellerSingeResponseDto>,
  updateUser: (id: string, user: Partial<Customer>) => Promise<GetResellerSingeResponseDto>,
  register: (body: registerBody) => Promise<ResponseRegisterDto>;
}

export const useAPIUserService = (): UserService => {
  return new ApiUserService();
};
