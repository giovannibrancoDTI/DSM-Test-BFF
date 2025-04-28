import { AlbumModel } from "../../domain/AlbumModel";

export interface IAlbumService {
  listAlbumsByUserId(userId: number): Promise<AlbumModel[]>;
}
