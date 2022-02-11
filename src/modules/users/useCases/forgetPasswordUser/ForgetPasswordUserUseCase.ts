import { inject, injectable, container } from "tsyringe"

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"
import { AppError } from "@shared/errors/AppError"
import { IForgetPasswordUserDTO } from "@modules/users/dtos/IForgetPasswordUserDTO"

import { MailtrapMailProvider } from "@providers/mailProvider/implementations/MailTrapMailProvider"

import bcrypt from "bcryptjs"

@injectable()
class ForgetPasswordUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ email, token, newPassword }: IForgetPasswordUserDTO): Promise<any> {
    if (email && !token && !newPassword) {

      const user = await this.usersRepository.find({ email })
      const mailProvider = container.resolve(MailtrapMailProvider)

      if (!user)
        throw new AppError({ message: "User doesn't exists", statusCode: 401 })

      let oneHourOnFuture = new Date()
      oneHourOnFuture.setHours(oneHourOnFuture.getHours() + 1)

      const resetPasswordToken = await bcrypt.hash(`${user.id}-${oneHourOnFuture}`, 8)
      const resetPasswordExpiresIn = oneHourOnFuture.getTime()
      await this.usersRepository.update({ id: String(user.id) }, { key: "resetPasswordToken", value: resetPasswordToken })
      await this.usersRepository.update({ id: String(user.id) }, { key: "resetPasswordExpiresIn", value: resetPasswordExpiresIn })

      await mailProvider.send({
        to: {
          name: user.username,
          email: user.email
        },
        from: {
          name: "Default Project",
          email: "defaultproject@gmail.com"
        },
        subject: "Token de redefinicao de senha",
        body: `Seu token <strong>${resetPasswordToken}</strong>`
      })

      return { message: `Token enviado para o email ${user.email}` }
    } else if (email && token && newPassword) {
      let user = await this.usersRepository.find({ email })

      let now: any = new Date()
      now = now.getTime()
      let timeLeft = parseInt(user.resetPasswordExpiresIn) - now

      if (token !== user.resetPasswordToken)
        throw new AppError({ message: "Invalid reset password token.", statusCode: 401 })

      if (timeLeft <= 0)
        throw new AppError({ message: "Reset password token is expired.", statusCode: 401 })

      const hashPassword = await bcrypt.hash(newPassword, 8)

      await this.usersRepository.update({ email }, { key: "password", value: hashPassword })
      return { message: "The password is reseted" }
    }

    throw new AppError({ message: "Error invalid arguments", statusCode: 404 })
  }
}

export { ForgetPasswordUserUseCase }