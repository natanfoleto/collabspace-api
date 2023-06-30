import { inject, injectable } from "tsyringe";

import { IUsersRepositories } from "@modules/users/iRepositories/IUsersRepositories";
import { IUuidProvider } from "@shared/container/providers/uuidProvider/IUuidProvider";

import { AppError } from "@helpers/errorsHandler";
import { AppResponse } from "@helpers/responseParser";

interface IRequest {
  id: string;
}

@injectable()
class InactivateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepositories,
    @inject("UuidProvider")
    private uuidProvider: IUuidProvider
  ) {}

  async execute({ id }: IRequest): Promise<AppResponse> {
    if (!this.uuidProvider.validateUUID(id)) {
      throw new AppError({
        message: "ID inválido!",
      });
    }

    const listUserById = await this.usersRepository.listById(id);

    if (!listUserById) {
      throw new AppError({
        message: "Usuário não encontrado!",
      });
    }

    await this.usersRepository.inactivate(id, false);

    return new AppResponse({
      message: "Usuário inativado com sucesso!",
    });
  }
}

export { InactivateUserUseCase };
