import { Request, Response } from "express";
import { IPhotoService } from "services/interfaces/IPhotoService";

class PhotoController {
  constructor(private photoService: IPhotoService) {}

  async getPhotos(req: Request, res: Response): Promise<void> {
    try {
      const { albumId } = req.params;
      const photos = await this.photoService.listPhotosByAlbumId(
        Number(albumId),
      );
      res.json(photos);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ error: errorMessage });
    }
  }

  async createPhoto(req: Request, res: Response): Promise<void> {
    try {
      const photo = req.body;
      const createdPhoto = await this.photoService.createPhoto(photo);
      res.status(201).json(createdPhoto);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ error: errorMessage });
    }
  }

  async deletePhoto(req: Request, res: Response): Promise<void> {
    try {
      const { photoId } = req.params;
      await this.photoService.deletePhoto(Number(photoId));
      res.status(204).send();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ error: errorMessage });
    }
  }
  async updatePhoto(req: Request, res: Response): Promise<void> {
    try {
      const photo = req.body;
      const updatedPhoto = await this.photoService.updatePhoto(photo);
      res.json(updatedPhoto);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ error: errorMessage });
    }
  }
}

export default PhotoController;
