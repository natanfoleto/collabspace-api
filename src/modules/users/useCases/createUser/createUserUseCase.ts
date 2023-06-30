import { inject, injectable } from "tsyringe";

import { IUsersRepositories } from "@modules/users/iRepositories/IUsersRepositories";
import { IUuidProvider } from "@shared/container/providers/uuidProvider/IUuidProvider";

import { IRequestCreateUser } from "@modules/users/dtos/users";

import { IBcryptProvider } from "@shared/container/providers/bcryptProvider/IBcryptProvider";
import { TelephoneFormat } from "@utils/formatData";
import { AppError } from "@helpers/errorsHandler";
import { AppResponse } from "@helpers/responseParser";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepositories,
    @inject("BcryptProvider")
    private bcrypt: IBcryptProvider,
    @inject("UuidProvider")
    private uuidProvider: IUuidProvider
  ) {}

  async execute({
    name,
    email,
    confirmEmail,
    password,
    confirmPassword,
    telephone,
    birthDate,
  }: IRequestCreateUser): Promise<AppResponse> {
    if (
      !password.match(
        /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
      )
    ) {
      throw new AppError({
        message: "Senha fraca!",
      });
    }

    if (password !== confirmPassword) {
      throw new AppError({
        message: "As senhas não coincidem",
      });
    }

    if (email !== confirmEmail) {
      throw new AppError({
        message: "Os e-mails não coincidem",
      });
    }

    const listUserByEmail = await this.usersRepository.listByEmail(email);

    if (listUserByEmail) {
      throw new AppError({
        message: "Usuário já cadastrado!",
      });
    }

    const passwordHash = await this.bcrypt.encryptPassword(password);

    const formatTelephone = TelephoneFormat(telephone);

    const creteUser = await this.usersRepository.create({
      id: this.uuidProvider.createUUID(),
      name,
      email,
      telephone: formatTelephone,
      birthDate,
      password: passwordHash.hash,
    });

    return new AppResponse({
      statusCode: 201,
      message: "Usuário criado com sucesso!",
      data: {
        id: creteUser.id,
        name: creteUser.name,
        telephone: creteUser.telephone,
      },
    });
  }
}

export { CreateUserUseCase };
