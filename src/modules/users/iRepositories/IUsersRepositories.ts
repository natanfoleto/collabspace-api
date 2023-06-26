import { Users, CreateUser } from "../dtos/users";

interface IUsersRepositories {
  create(user: CreateUser): Promise<Users>;
  listByEmail(email: string): Promise<Users | null>;
}

export { IUsersRepositories };
