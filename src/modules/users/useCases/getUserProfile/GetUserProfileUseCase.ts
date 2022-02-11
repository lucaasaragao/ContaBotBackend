import { inject, injectable } from "tsyringe"

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"
import { AppError } from "@shared/errors/AppError"
import { IAuthenticateUserDTO } from "@modules/users/dtos/IAuthenticateUserDTO"

@injectable()
class GetUserProfileUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ email, username, id }: IAuthenticateUserDTO): Promise<any> {
    let user = await this.usersRepository.find({ email, username, id })
    delete user['password']
    if (!user)
      throw new AppError({ message: "User doesn't exists", statusCode: "404" })

    return user
  }
}

export { GetUserProfileUseCase }