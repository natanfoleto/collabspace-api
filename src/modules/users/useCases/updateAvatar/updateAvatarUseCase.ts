import { inject, injectable } from "tsyringe";
import { IUsersRepositories } from "@modules/users/iRepositories/IUsersRepositories";
import { IRequestUpdateUserAvatar } from "@modules/users/dtos/users";
import { AppResponse } from "@helpers/responseParser";
import { AppError } from "@helpers/errorsHandler";

interface IRequest extends IRequestUpdateUserAvatar {
  usrId: string;
}

@injectable()
class UpdateAvatarUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUsersRepositories
  ) {}

  async execute({ usrId, avatarUrl }: IRequest): Promise<AppResponse> {
    if (avatarUrl)
      if (
        !avatarUrl.match(
          /https?:\/\/(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?/gi
        )
      ) {
        throw new AppError({
          message: "URL inválida!",
        });
      }

    await this.userRepository.updateAvatar({
      id: usrId,
      avatarUrl,
    });

    return new AppResponse({
      message: "Avatar atualizado com sucesso!",
    });
  }
}

export { UpdateAvatarUseCase };
