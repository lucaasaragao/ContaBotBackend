import { Request, Response } from "express"
import { container } from "tsyringe"

import { GetUserProfileUseCase } from "./GetUserProfileUseCase"

class GetUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.authenticatedUser.id.toString()
    const getUserProfileUseCase = container.resolve(GetUserProfileUseCase)

    const userData = await getUserProfileUseCase.execute({ id })
    return response.status(201).send({ status: "success", ...userData })
  }
}

export { GetUserProfileController }