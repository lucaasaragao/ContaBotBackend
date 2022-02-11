import { Request, Response } from "express"

import { injectable, container } from "tsyringe"
import { UpdateUserUseCase } from "./updateUserUseCase"

@injectable()
class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId, key, value } = request.body
    const updateUserUseCase = container.resolve(UpdateUserUseCase)

    return response.status(201).send({ status: "success", ...await updateUserUseCase.execute({ userId, key, value }) })
  }
}

export { UpdateUserController }