import { PhotoModel } from "../../domain/PhotoModel";

export interface IPhotoService {
  listPhotosByAlbumId(albumId: number): Promise<PhotoModel[]>;
}
