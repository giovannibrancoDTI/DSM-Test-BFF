import { AlbumModel } from "@/domain/AlbumModel";
import { IPhotoRepository } from "@/repositories/interfaces/IPhotoRepository";
import AlbumRepository from "../repositories/AlbumRepository";
import { IAlbumRepository } from "../repositories/interfaces/IAlbumRepository";
import PhotoRepository from "../repositories/PhotoRepository";
import { IAlbumService } from "./interfaces/IAlbumService";

class AlbumService implements IAlbumService {
  constructor(
    private albumRepository: IAlbumRepository,
    private photoRepository: IPhotoRepository,
  ) {}

  async listAlbumsByUserId(userId: number) {
    if (!userId) throw new Error("User ID is required");

    return await this.albumRepository.getAlbumsByUserId(userId);
  }

  async createAlbum(album: { userId: number; title: string }) {
    if (!album.userId || !album.title) {
      throw new Error("User ID and title are required");
    }

    return await this.albumRepository.createAlbum(album);
  }

  async deleteAlbum(albumId: number) {
    if (!albumId) throw new Error("Album ID is required");

    const photos = await this.photoRepository.getPhotosByAlbumId(albumId);

    photos.forEach(async (photo) => {
      await this.photoRepository.deletePhoto(photo.id);
    });

    return await this.albumRepository.deleteAlbum(albumId);
  }
  async updateAlbum(album: AlbumModel) {
    if (!album.id || !album.userId || !album.title) {
      throw new Error("ID, User ID, and title are required");
    }

    return await this.albumRepository.updateAlbum(album);
  }
}

export default new AlbumService(AlbumRepository, PhotoRepository);
