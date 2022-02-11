import { inject, injectable } from "tsyringe"

import { IUserCreateDTO } from "@modules/users/dtos/IUserCreateDTO"
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"
import { AppError } from "@shared/errors/AppError"

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }
  async execute({ username, email, password }: IUserCreateDTO): Promise<void> {
    if (password.length < 6)
      throw new AppError({
        message: "Invalid password length",
        statusCode: 400,
      })
    
    const userAlreadyExists = await this.usersRepository.find({
      username,
      email,
    })

    if (userAlreadyExists)
      throw new AppError({
        message: "User already exists",
        statusCode: 409,
      })

    const passwordHash = await this.usersRepository.hashPassword(password)

    await this.usersRepository.create({
      username,
      email,
      password: passwordHash,
    })
  }
}

export { CreateUserUseCase }