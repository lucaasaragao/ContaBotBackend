import { Request, Response } from "express"
import { container } from "tsyringe"

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, email, password } = request.body
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)

    const userTokens = await authenticateUserUseCase.execute({
      username,
      email,
      password
    })

    return response.status(201).send({ status: "success", ...userTokens })
  }
}

export { AuthenticateUserController }