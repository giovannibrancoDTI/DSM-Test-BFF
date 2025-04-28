import { UserModel } from "../../domain/UserModel";

export interface IUserService {
  listUsers(): Promise<UserModel[]>;
}
