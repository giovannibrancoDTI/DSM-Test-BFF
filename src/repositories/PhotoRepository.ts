import axios from "axios";
import { PhotoModel } from "../domain/PhotoModel";
import { IPhotoRepository } from "../repositories/interfaces/IPhotoRepository";

class PhotoRepository implements IPhotoRepository {
  async getPhotosByAlbumId(albumId: number) {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`,
    );

    if (response.status !== 200) throw new Error("Failed to fetch photos");

    return response.data as PhotoModel[];
  }
}

export default new PhotoRepository();
