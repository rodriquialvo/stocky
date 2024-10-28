import { CreateUserDto, FilterGetResellersDto } from '../../services/users/dtos/generic';
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
      console.log("e", e);
      setStatus(getErrorStatus(e as Error));
    }
  };

  const createUser = async (reseller: CreateUserDto) => {
    setStatus(getStartStatus());
    try {
      const response = await usersService.createUser(reseller);
      if (!response.reseller) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      setStatus(getSuccessStatus());
    } catch (e) {
      console.log("e", e);
      setStatus(getErrorStatus(e as Error));
    }
  };

  return {
    getResellers,
    createUser
  };
};
