import { IUsers, ICreateUser, IUpdateUser } from "@modules/users/dtos/users";

interface IUsersRepositories {
  create(user: ICreateUser): Promise<IUsers>;
  listByEmail(email: string): Promise<IUsers | null>;
  listById(id: string): Promise<IUsers | null>;
  update(data: IUpdateUser): Promise<void>;
  inactivate(id: string, status: boolean): Promise<void>;
}

export { IUsersRepositories };
