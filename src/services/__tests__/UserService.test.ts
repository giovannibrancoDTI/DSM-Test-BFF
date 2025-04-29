import UserService from "@/services/UserService";
import UserRepository from "@/repositories/UserRepository";
import { UserModel } from "@/domain/UserModel";

jest.mock("@/repositories/UserRepository", () => ({
  getAllUsers: jest.fn(),
}));

describe("UserService", () => {
  const mockUsers: UserModel[] = [
    { id: 1, username: "Alice", email: "alice@example.com" },
    { id: 2, username: "Bob", email: "bob@example.com" },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("listUsers", () => {
    it("should return all users from repository", async () => {
      (UserRepository.getAllUsers as jest.Mock).mockResolvedValue(mockUsers);

      const result = await UserService.listUsers();

      expect(UserRepository.getAllUsers).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });
  });
});
