import { inject, injectable } from "tsyringe";

import { IUsersRepositories } from "@/modules/users/iRepositories/IUsersRepositories";

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
    private usersRepository: IUsersRepositories
  ) {}

  async execute({
    id,
    name,
    telephone,
    birthDate,
  }: IRequest): Promise<AppResponse> {
    const listUserById = await this.usersRepository.listById(id);

    if (!listUserById) {
      throw new AppError({
        result: "error",
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
      result: "success",
      message: "Usuário atualizado com sucesso!",
    });
  }
}

export { UpdateUserUseCase };
