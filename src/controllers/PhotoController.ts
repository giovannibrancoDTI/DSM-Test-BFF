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
}

export default PhotoController;
