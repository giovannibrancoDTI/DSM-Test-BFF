import axios from "axios";
import { UserModel } from "../domain/UserModel";
import { IUserRepository } from "./interfaces/IUserRepository";

class UserRepository implements IUserRepository {
  async getAllUsers() {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (response.status !== 200) throw new Error("Failed to fetch users");

    return response.data as UserModel[];
  }
}

export default new UserRepository();
