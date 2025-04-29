import { AlbumModel } from "../../domain/AlbumModel";

export interface IAlbumRepository {
  getAlbumsByUserId(userId: number): Promise<AlbumModel[]>;
  createAlbum(album: { userId: number; title: string }): Promise<AlbumModel>;
  deleteAlbum(albumId: number): Promise<void>;
  updateAlbum(album: AlbumModel): Promise<AlbumModel>;
}
