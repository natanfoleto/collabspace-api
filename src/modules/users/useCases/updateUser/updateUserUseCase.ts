import { inject, injectable } from "tsyringe";

import { IUsersRepositories } from "@/modules/users/iRepositories/IUsersRepositories";
import { IUuidProvider } from "@/shared/container/providers/uuidProvider/IUuidProvider";

import { IRequestUpdateUser } from "@/modules/users/dtos/users";

import { TelephoneFormat } from "@/utils/formatData";
import { AppError } from "@/helper/errorsHandler";
import { AppResponse } from "@/helper/responseParser";

interface IRequest extends IRequestUpdateUser {
  id: string;
}

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepositories,
    @inject("UuidProvider")
    private uuidProvider: IUuidProvider
  ) {}

  async execute({
    id,
    name,
    telephone,
    birthDate,
  }: IRequest): Promise<AppResponse> {
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

    const formatTelephone = TelephoneFormat(telephone);

    await this.usersRepository.update({
      id,
      name,
      telephone: formatTelephone,
      birthDate,
    });

    return new AppResponse({
      message: "Usuário atualizado com sucesso!",
    });
  }
}

export { UpdateUserUseCase };
