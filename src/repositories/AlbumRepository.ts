import axios from "axios";
import { AlbumModel } from "../domain/AlbumModel";
import { IAlbumRepository } from "../repositories/interfaces/IAlbumRepository";

class AlbumRepository implements IAlbumRepository {
  async getAlbumsByUserId(userId: number) {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId}/albums`,
    );

    if (response.status !== 200) throw new Error("Failed to fetch albums");

    return response.data as AlbumModel[];
  }

  async createAlbum(album: {
    userId: number;
    title: string;
  }): Promise<AlbumModel> {
    const response = await axios.post(
      `https://jsonplaceholder.typicode.com/albums`,
      album,
    );

    if (response.status !== 201) throw new Error("Failed to create album");

    return response.data as AlbumModel;
  }

  async deleteAlbum(albumId: number): Promise<void> {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/albums/${albumId}`,
    );

    if (response.status !== 200) throw new Error("Failed to delete album");
  }

  async updateAlbum(album: AlbumModel): Promise<AlbumModel> {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/albums/${album.id}`,
      album,
    );

    if (response.status !== 200) throw new Error("Failed to update album");

    return response.data as AlbumModel;
  }
}

export default new AlbumRepository();
