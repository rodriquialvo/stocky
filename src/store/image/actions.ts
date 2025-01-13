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

  const base64ToBlob = (base64, mimeType) => {
    const byteCharacters = atob(base64.split(',')[1]); // Eliminar el prefijo data:image/jpeg;base64,
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const byteSlice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(byteSlice.length);
      
      for (let i = 0; i < byteSlice.length; i++) {
        byteNumbers[i] = byteSlice.charCodeAt(i);
      }
      byteArrays.push(new Uint8Array(byteNumbers));
    }
  
    return new Blob(byteArrays, { type: mimeType });
  }

  const createNewImageUrl = async (body: any) => {

    setStatus(getStartStatus());
    
    const formData:any = new FormData();
    await formData.append('file', base64ToBlob(body.data_url, body.file.type));
    
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
