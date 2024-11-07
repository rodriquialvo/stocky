import { useAPICategoryService } from "../../services/categories/product.service";
import { getErrorStatus, getStartStatus, getSuccessStatus } from "../helper/statusStateFactory";
import { useCategorytore } from './slice';


export const CategoryAction = () => {
  const categoryService = useAPICategoryService();
  const setStatus = useCategorytore(state => state.setStatus);
  const setCategories = useCategorytore(state => state.setCategories);

  const getCategories = async () => {
    setStatus(getStartStatus());
    try {
      const data = await categoryService.getCategories();
      if (!data.categories) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      setStatus(getSuccessStatus());
      setCategories(data.categories);
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  };

  return {
    getCategories,
  };
};
