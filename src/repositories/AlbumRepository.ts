import axios from "axios";
import { AlbumModel } from "../domain/AlbumModel";
import { IAlbumRepository } from "../repositories/interfaces/IAlbumRepository";

class AlbumRepository implements IAlbumRepository {
  async getAlbumsByUserId(userId: number) {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${userId}/albums`
    );

    if (response.status !== 200) throw new Error("Failed to fetch albums");

    return response.data as AlbumModel[];
  }
}

export default new AlbumRepository();
