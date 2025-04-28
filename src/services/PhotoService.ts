import { IPhotoRepository } from "../repositories/interfaces/IPhotoRepository";
import PhotoRepository from "../repositories/PhotoRepository";
import { IPhotoService } from "./interfaces/IPhotoService";

class PhotoService implements IPhotoService {
  constructor(private photoRepository: IPhotoRepository) {}

  async listPhotosByAlbumId(albumId: number) {
    return await this.photoRepository.getPhotosByAlbumId(albumId);
  }
}

export default new PhotoService(PhotoRepository);
