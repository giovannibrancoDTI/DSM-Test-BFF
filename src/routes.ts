import { Router } from "express";

import UserController from "./controllers/UserController";
import AlbumController from "./controllers/AlbumController";
import PhotoController from "./controllers/PhotoController";

import UserService from "./services/UserService";
import AlbumService from "./services/AlbumService";
import PhotoService from "./services/PhotoService";

const userController = new UserController(UserService);
const albumController = new AlbumController(AlbumService);
const photoController = new PhotoController(PhotoService);

const router = Router();

router.get("/users", (req, res) => userController.getUsers(req, res));

router.get("/users/:userId/albums", (req, res) =>
  albumController.getAlbumsByUser(req, res)
);

router.get("/photos", (req, res) => photoController.getPhotos(req, res));

export default router;
