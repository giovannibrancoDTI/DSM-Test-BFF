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
  albumController.getAlbumsByUser(req, res),
);
router.get("/albums/:albumId/photos", (req, res) =>
  photoController.getPhotos(req, res),
);

router.post("/photos", (req, res) => photoController.createPhoto(req, res));
router.post("/albums", (req, res) => albumController.createAlbum(req, res));

router.delete("/albums/:albumId", (req, res) =>
  albumController.deleteAlbum(req, res),
);
router.delete("/photos/:photoId", (req, res) =>
  photoController.deletePhoto(req, res),
);

router.put("/albums/:albumId", (req, res) =>
  albumController.updateAlbum(req, res),
);
router.put("/photos/:photoId", (req, res) =>
  photoController.updatePhoto(req, res),
);

export default router;
