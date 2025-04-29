import { Response, Request } from "express";
import { IUserService } from "services/interfaces/IUserService";

class UserController {
  constructor(private userService: IUserService) {}

  async getUsers(_req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.listUsers();
      res.json(users);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      res.status(500).json({ error: errorMessage });
    }
  }
}

export default UserController;
