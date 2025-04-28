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
}

export default AlbumController;
