
import { useAPIRoleService } from '../../services/roles/role.service';
import {
  getErrorStatus,
  getStartStatus,
  getSuccessStatus,
} from '../helper/statusStateFactory';
import { useRoleStore } from './slice';

export const RoleAction = () => {
  const rolesService = useAPIRoleService();
  const setStatus = useRoleStore(state => state.setStatus);
  const setRoles = useRoleStore(state => state.setRoles);

  const getRoles = async () => {
    setStatus(getStartStatus());
    try {
      const response = await rolesService.getRoles();
      if (!response.roles) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      setStatus(getSuccessStatus());
      setRoles(response);
    } catch (e) {
      console.log("e", e);
      setStatus(getErrorStatus(e as Error));
    }
  };

  return {
    getRoles
  };
};
