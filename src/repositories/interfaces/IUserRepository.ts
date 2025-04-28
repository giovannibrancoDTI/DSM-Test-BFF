import { UserModel } from "../../domain/UserModel";

export interface IUserRepository {
  getAllUsers(): Promise<UserModel[]>;
}
