import * as JWT from "jsonwebtoken"
import { inject, injectable } from "tsyringe"

import { IAuthenticateUserDTO } from "@modules/users/dtos/IAuthenticateUserDTO"
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"
import { AppError } from "@shared/errors/AppError"

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ email, username, password, id }: IAuthenticateUserDTO) {
    const user = await this.usersRepository.find({ email, username, id })
    if (!user) {
      console.log({ email, username, password, id })
      throw new AppError({
        message: "Incorrect email/username or password",
        statusCode: 400
      })
    }

    const passwordMatchs = await this.usersRepository.comparePassword(password, user.password)
    if (!passwordMatchs)
      throw new AppError({
        message: "Incorrect email/username or password",
        statusCode: 400
      })
    

    const accessToken = JWT.sign({}, process.env.JWT_SECRET_KEY.replace(/\\n/gm, '\n'), {
      expiresIn: "12h",
      subject: String(user.id),
      algorithm: "RS256"
    })

    return { accessToken }
  }
}

export { AuthenticateUserUseCase }