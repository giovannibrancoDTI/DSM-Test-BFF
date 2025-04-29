import { PhotoModel } from "@/domain/PhotoModel";
import PhotoService from "@/services/PhotoService";
import PhotoRepository from "@/repositories/PhotoRepository";

jest.mock("@/repositories/PhotoRepository", () => ({
  getPhotosByAlbumId: jest.fn(),
  createPhoto: jest.fn(),
  deletePhoto: jest.fn(),
  updatePhoto: jest.fn(),
}));

describe("PhotoService", () => {
  const mockPhoto: PhotoModel = {
    albumId: 1,
    id: 10,
    title: "Test Photo",
    url: "https://example.com/photo.jpg",
    thumbnailUrl: "https://example.com/thumb.jpg",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("listPhotosByAlbumId", () => {
    it("should call getPhotosByAlbumId with correct albumId", async () => {
      const mockResult = [mockPhoto];
      (PhotoRepository.getPhotosByAlbumId as jest.Mock).mockResolvedValue(
        mockResult,
      );

      const result = await PhotoService.listPhotosByAlbumId(1);

      expect(PhotoRepository.getPhotosByAlbumId).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockResult);
    });
  });

  describe("createPhoto", () => {
    it("should throw error if required fields are missing", async () => {
      const incompletePhoto = { ...mockPhoto, title: "" };

      await expect(
        PhotoService.createPhoto(incompletePhoto as never),
      ).rejects.toThrow("Album ID, title, URL, and thumbnail URL are required");
    });

    it("should call createPhoto and return created photo", async () => {
      (PhotoRepository.createPhoto as jest.Mock).mockResolvedValue(mockPhoto);

      const result = await PhotoService.createPhoto(mockPhoto);

      expect(PhotoRepository.createPhoto).toHaveBeenCalledWith(mockPhoto);
      expect(result).toEqual(mockPhoto);
    });
  });

  describe("deletePhoto", () => {
    it("should call deletePhoto with correct photoId", async () => {
      (PhotoRepository.deletePhoto as jest.Mock).mockResolvedValue(undefined);

      await PhotoService.deletePhoto(10);

      expect(PhotoRepository.deletePhoto).toHaveBeenCalledWith(10);
    });
  });

  describe("updatePhoto", () => {
    it("should throw error if required fields are missing", async () => {
      const invalidPhoto = { ...mockPhoto, id: undefined };

      await expect(
        PhotoService.updatePhoto(invalidPhoto as never),
      ).rejects.toThrow(
        "ID, Album ID, title, URL, and thumbnail URL are required",
      );
    });

    it("should call updatePhoto and return updated photo", async () => {
      (PhotoRepository.updatePhoto as jest.Mock).mockResolvedValue(mockPhoto);

      const result = await PhotoService.updatePhoto(mockPhoto);

      expect(PhotoRepository.updatePhoto).toHaveBeenCalledWith(mockPhoto);
      expect(result).toEqual(mockPhoto);
    });
  });
});
