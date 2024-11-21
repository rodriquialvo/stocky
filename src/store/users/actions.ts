import { CreateUserDto, FilterGetResellersDto, Reseller } from '../../services/users/dtos/generic';
import { useAPIUserService } from '../../services/users/user.service';
import {
  getErrorStatus,
  getStartStatus,
  getSuccessStatus,
} from '../helper/statusStateFactory';
import { useUserStore } from './slice';

export const UserAction = () => {
  const usersService = useAPIUserService();
  const setStatus = useUserStore(state => state.setStatus);
  const setResellersList = useUserStore(state => state.setResellersList);
  const setCreateOrUpdateStatus = useUserStore(state => state.setCreateOrUpdateStatus);

  const getResellers = async (filter: FilterGetResellersDto) => {
    setStatus(getStartStatus());
    try {
      const response = await usersService.getUsers(filter);
      if (!response.resellers) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      setStatus(getSuccessStatus());
      setResellersList(response);
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  };

  const createUser = async (reseller: CreateUserDto) => {
    setCreateOrUpdateStatus(getStartStatus());
    try {
      const response = await usersService.createUser(reseller);
      if (!response.user) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      setCreateOrUpdateStatus(getSuccessStatus());
    } catch (e) {
      setCreateOrUpdateStatus(getErrorStatus(e as Error));
    }
  };

  const updateUser = async (id: string, reseller: Partial<Reseller>) => {
    setCreateOrUpdateStatus(getStartStatus());
    try {
      const response = await usersService.updateUser(id, reseller);
      if (!response.user) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      setCreateOrUpdateStatus(getSuccessStatus());
    } catch (e) {
      setCreateOrUpdateStatus(getErrorStatus(e as Error));
    }
  };

  const clearCreateOrUpdateStatus = () => {
    setCreateOrUpdateStatus(getStartStatus());
  };

  return {
    getResellers,
    createUser,
    updateUser,
    clearCreateOrUpdateStatus
  };
};
