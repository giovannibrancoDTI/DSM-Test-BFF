import { AlbumModel } from "../../domain/AlbumModel";

export interface IAlbumRepository {
  getAlbumsByUserId(userId: number): Promise<AlbumModel[]>;
}
