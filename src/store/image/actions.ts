import { useImageStore } from './slice';
import {
  getErrorStatus,
  getStartStatus,
  getSuccessStatus,
} from '../helper/statusStateFactory';
import { useAPIImageService } from '../../services/image/image.service';

export const ImageAction = () => {

  const setStatus = useImageStore(state => state.setStatus)
  const imageService = useAPIImageService()
  const createNewImageUrl = async (body: any) => {

    setStatus(getStartStatus());
    
    const formData:any = new FormData();
    await formData.append('file', body);
    
    try {
      const response = await imageService.postCreateNewImageUrl(formData);
      if (!response.url) {
        setStatus(getErrorStatus('No response'));
        return;
      }
      setStatus(getSuccessStatus());
      return response.url;
    } catch (e) {
      setStatus(getErrorStatus(e as Error));
    }
  };

  return {
    createNewImageUrl,
  };
};
