import { PhotoModel } from "@/domain/PhotoModel";
import { IPhotoRepository } from "../repositories/interfaces/IPhotoRepository";
import PhotoRepository from "../repositories/PhotoRepository";
import { IPhotoService } from "./interfaces/IPhotoService";

class PhotoService implements IPhotoService {
  constructor(private photoRepository: IPhotoRepository) {}

  async listPhotosByAlbumId(albumId: number) {
    return await this.photoRepository.getPhotosByAlbumId(albumId);
  }

  async createPhoto(photo: PhotoModel) {
    if (!photo.albumId || !photo.title || !photo.url || !photo.thumbnailUrl) {
      throw new Error("Album ID, title, URL, and thumbnail URL are required");
    }

    return await this.photoRepository.createPhoto(photo);
  }

  async deletePhoto(photoId: number) {
    return await this.photoRepository.deletePhoto(photoId);
  }
  async updatePhoto(photo: PhotoModel) {
    if (
      !photo.id ||
      !photo.albumId ||
      !photo.title ||
      !photo.url ||
      !photo.thumbnailUrl
    ) {
      throw new Error(
        "ID, Album ID, title, URL, and thumbnail URL are required",
      );
    }

    return await this.photoRepository.updatePhoto(photo);
  }
}

export default new PhotoService(PhotoRepository);
