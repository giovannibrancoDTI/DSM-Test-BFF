import { PhotoModel } from "../../domain/PhotoModel";

export interface IPhotoRepository {
  getPhotosByAlbumId(albumId: number): Promise<PhotoModel[]>;
}
