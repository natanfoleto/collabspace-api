import "./providers";
import { container } from "tsyringe";

import { IUsersRepositories } from "@modules/users/iRepositories/IUsersRepositories";
import { UsersRepository } from "@modules/users/repositories/usersRepository";

container.registerSingleton<IUsersRepositories>(
  "UsersRepository",
  UsersRepository
);
