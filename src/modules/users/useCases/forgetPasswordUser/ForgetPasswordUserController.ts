import { Request, Response } from "express"
import { container } from "tsyringe"

import { ForgetPasswordUserUseCase } from "./ForgetPasswordUserUseCase"

class ForgetPasswordUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, token, newPassword } = request.body
    const forgetPasswordUserUseCase = container.resolve(ForgetPasswordUserUseCase)

    const forgetPassword = await forgetPasswordUserUseCase.execute({ email, token, newPassword })
    return response.status(201).send({ status: "success", ...forgetPassword })
  }
}


export { ForgetPasswordUserController }