import { Request, Response } from "express"

import { container, injectable } from "tsyringe"
import { GetAllUsersUseCase } from "./getAllUsersUseCase"

@injectable()
class GetAllUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getAllUsersUseCase = container.resolve(GetAllUsersUseCase)
    const { page, limit, search } = request.query

    return response.status(201).send({ status: "success", ...await getAllUsersUseCase.execute({ page, limit, search }) })
  }
}

export { GetAllUsersController }