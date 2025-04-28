import AlbumRepository from "../repositories/AlbumRepository";
import { IAlbumRepository } from "../repositories/interfaces/IAlbumRepository";
import { IAlbumService } from "./interfaces/IAlbumService";

class AlbumService implements IAlbumService {
  constructor(private albumRepository: IAlbumRepository) {}

  async listAlbumsByUserId(userId: number) {
    if (!userId) throw new Error("User ID is required");

    return await this.albumRepository.getAlbumsByUserId(userId);
  }
}

export default new AlbumService(AlbumRepository);
