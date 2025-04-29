import AlbumService from "../AlbumService";
import { AlbumModel } from "@/domain/AlbumModel";
import AlbumRepository from "@/repositories/AlbumRepository";
import PhotoRepository from "@/repositories/PhotoRepository";

jest.mock("@/repositories/PhotoRepository", () => ({
  __esModule: true,
  default: {
    getPhotosByAlbumId: jest.fn(),
    deletePhoto: jest.fn(),
  },
}));

jest.mock("@/repositories/AlbumRepository", () => ({
  __esModule: true,
  default: {
    getAlbumsByUserId: jest.fn(),
    createAlbum: jest.fn(),
    deleteAlbum: jest.fn(),
    updateAlbum: jest.fn(),
  },
}));

describe("AlbumService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("listAlbumsByUserId", () => {
    it("should return albums for a valid userId", async () => {
      const mockAlbums = [{ id: 1, userId: 1, title: "My Album" }];
      (AlbumRepository.getAlbumsByUserId as jest.Mock).mockResolvedValue(
        mockAlbums,
      );

      const result = await AlbumService.listAlbumsByUserId(1);
      expect(result).toEqual(mockAlbums);
      expect(AlbumRepository.getAlbumsByUserId).toHaveBeenCalledWith(1);
    });

    it("should throw error if userId is missing", async () => {
      await expect(AlbumService.listAlbumsByUserId(0)).rejects.toThrow(
        "User ID is required",
      );
    });
  });

  describe("createAlbum", () => {
    it("should create album when data is valid", async () => {
      const album = { userId: 1, title: "New Album" };
      (AlbumRepository.createAlbum as jest.Mock).mockResolvedValue(album);

      const result = await AlbumService.createAlbum(album);
      expect(result).toEqual(album);
      expect(AlbumRepository.createAlbum).toHaveBeenCalledWith(album);
    });

    it("should throw error if missing title or userId", async () => {
      await expect(
        AlbumService.createAlbum({ userId: 0, title: "" }),
      ).rejects.toThrow("User ID and title are required");
    });
  });

  describe("deleteAlbum", () => {
    it("should delete all photos and album", async () => {
      const albumId = 1;
      const mockPhotos = [
        { id: 101, albumId, title: "photo", url: "", thumbnailUrl: "" },
      ];
      (PhotoRepository.getPhotosByAlbumId as jest.Mock).mockResolvedValue(
        mockPhotos,
      );
      (PhotoRepository.deletePhoto as jest.Mock).mockResolvedValue(undefined);
      (AlbumRepository.deleteAlbum as jest.Mock).mockResolvedValue(true);

      const result = await AlbumService.deleteAlbum(albumId);
      expect(PhotoRepository.getPhotosByAlbumId).toHaveBeenCalledWith(albumId);
      expect(PhotoRepository.deletePhoto).toHaveBeenCalledWith(101);
      expect(AlbumRepository.deleteAlbum).toHaveBeenCalledWith(albumId);
      expect(result).toBe(true);
    });

    it("should throw if albumId is missing", async () => {
      await expect(AlbumService.deleteAlbum(0)).rejects.toThrow(
        "Album ID is required",
      );
    });
  });

  describe("updateAlbum", () => {
    it("should update album with valid data", async () => {
      const album: AlbumModel = { id: 1, userId: 1, title: "Updated" };
      (AlbumRepository.updateAlbum as jest.Mock).mockResolvedValue(album);

      const result = await AlbumService.updateAlbum(album);
      expect(result).toEqual(album);
      expect(AlbumRepository.updateAlbum).toHaveBeenCalledWith(album);
    });

    it("should throw if data is incomplete", async () => {
      await expect(
        AlbumService.updateAlbum({ id: 1, userId: 0, title: "" }),
      ).rejects.toThrow("ID, User ID, and title are required");
    });
  });
});
