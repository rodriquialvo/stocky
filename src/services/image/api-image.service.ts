import Http from '../http';
import { CreateNewImageURLResponse } from './dtos/postCreateNewImageUrl';
import { ImageService } from './image.service';

export class ApiImageService implements ImageService {
  private http: Http;
  constructor() {
    this.http = new Http('', 'images');
  }
  postCreateNewImageUrl = (body: any) => this.http.postFormData<CreateNewImageURLResponse>('upload', body);
}
