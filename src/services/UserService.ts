import { IUserRepository } from "../repositories/interfaces/IUserRepository";
import UserRepository from "../repositories/UserRepository";
import { IUserService } from "./interfaces/IUserService";

class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async listUsers() {
    return await this.userRepository.getAllUsers();
  }
}

export default new UserService(UserRepository);
