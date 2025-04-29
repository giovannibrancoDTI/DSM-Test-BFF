import { Request, Response } from "express";
import { IAlbumService } from "services/interfaces/IAlbumService";

class AlbumController {
  constructor(private albumService: IAlbumService) {}

  async getAlbumsByUser(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    try {
      const albums = await this.albumService.listAlbumsByUserId(Number(userId));
      res.json(albums);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ error: errorMessage });
    }
  }

  async createAlbum(req: Request, res: Response): Promise<void> {
    try {
      const album = req.body;
      const createdAlbum = await this.albumService.createAlbum(album);
      res.status(201).json(createdAlbum);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ error: errorMessage });
    }
  }

  async deleteAlbum(req: Request, res: Response): Promise<void> {
    const { albumId } = req.params;
    try {
      await this.albumService.deleteAlbum(Number(albumId));
      res.status(204).send();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ error: errorMessage });
    }
  }

  async updateAlbum(req: Request, res: Response): Promise<void> {
    try {
      const album = req.body;
      const updatedAlbum = await this.albumService.updateAlbum(album);
      res.json(updatedAlbum);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ error: errorMessage });
    }
  }
}

export default AlbumController;
