import { ApiRoleService } from './api-role.service';
import { GetRolesResponseDto } from './dtos/generic';

export interface RoleService {
  getRoles: () => Promise<GetRolesResponseDto>,
}

export const useAPIRoleService = (): RoleService => {
  return new ApiRoleService();
};
