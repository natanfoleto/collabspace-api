import { Request, Response } from "express";
import { container } from "tsyringe";

import { InactivateUserUseCase } from "./inactivateUserUseCase";

class InactivateUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params as { id: string };

    const inactivateUserUseCase = container.resolve(InactivateUserUseCase);

    const inactivateUser = await inactivateUserUseCase.execute({
      id,
    });

    return response.status(201).json(inactivateUser);
  }
}

export { InactivateUserController };
