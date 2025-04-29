import { PhotoModel } from "../../domain/PhotoModel";

export interface IPhotoService {
  listPhotosByAlbumId(albumId: number): Promise<PhotoModel[]>;
  createPhoto(photo: PhotoModel): Promise<PhotoModel>;
  deletePhoto(photoId: number): Promise<void>;
  updatePhoto(photo: PhotoModel): Promise<PhotoModel>;
}
