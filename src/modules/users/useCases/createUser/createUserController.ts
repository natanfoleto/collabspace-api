import { Request, Response } from "express";
import { container } from "tsyringe";

import { RequestUser } from "../../dtos/users";

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
    } = request.body as RequestUser;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const createUser = await createUserUseCase.execute({
      name,
      email,
      confirmEmail,
      password,
      confirmPassword,
      telephone,
      birthDate,
    });

    return response.status(201).json(createUser);
  }
}

export { CreateUserController };
