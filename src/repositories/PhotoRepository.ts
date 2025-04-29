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

  async createPhoto(photo: PhotoModel): Promise<PhotoModel> {
    const response = await axios.post(
      `https://jsonplaceholder.typicode.com/photos`,
      photo,
    );

    if (response.status !== 201) throw new Error("Failed to create photo");

    return response.data as PhotoModel;
  }

  async deletePhoto(photoId: number): Promise<void> {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/photos/${photoId}`,
    );

    if (response.status !== 200) throw new Error("Failed to delete photo");
  }
  async updatePhoto(photo: PhotoModel): Promise<PhotoModel> {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/photos/${photo.id}`,
      photo,
    );

    if (response.status !== 200) throw new Error("Failed to update photo");

    return response.data as PhotoModel;
  }
}

export default new PhotoRepository();
