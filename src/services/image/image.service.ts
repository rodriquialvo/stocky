import { ApiImageService } from './api-image.service';
import { CreateNewImageURLResponse } from './dtos/postCreateNewImageUrl';

export interface ImageService {
  postCreateNewImageUrl: (body: any) => Promise<CreateNewImageURLResponse>;
}

export const useAPIImageService = (): ImageService => {
  return new ApiImageService();
};
