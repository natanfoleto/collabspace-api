import { inject, injectable } from "tsyringe";

import { IUsersRepositories } from "@/modules/users/iRepositories/IUsersRepositories";

import { AppError } from "@/helper/errorsHandler";
import { AppResponse } from "@/helper/responseParser";

interface IRequest {
  id: string;
}

@injectable()
class InactivateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepositories
  ) {}

  async execute({ id }: IRequest): Promise<AppResponse> {
    const listUserById = await this.usersRepository.listById(id);

    if (!listUserById) {
      throw new AppError({
        result: "error",
        message: "Usuário não encontrado!",
      });
    }

    await this.usersRepository.inactivate(id, false);

    return new AppResponse({
      result: "success",
      message: "Usuário inativado com sucesso!",
    });
  }
}

export { InactivateUserUseCase };
