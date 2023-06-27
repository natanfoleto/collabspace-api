import { Request, Response } from "express";
import { container } from "tsyringe";

import { IRequestCreateUser } from "@/modules/users/dtos/users";

import { CreateUserUseCase } from "./createUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const {
      name,
      email,
      confirmEmail,
      password,
      confirmPassword,
      telephone,
      birthDate,
    } = request.body as IRequestCreateUser;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const result = await createUserUseCase.execute({
      name,
      email,
      confirmEmail,
      password,
      confirmPassword,
      telephone,
      birthDate,
    });

    return response.status(result.statusCode).json(result);
  }
}

export { CreateUserController };
