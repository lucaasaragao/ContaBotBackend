import { inject, injectable } from "tsyringe"
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ userId, key, value }) {
    let tryUpdate = await this.usersRepository.update({ id: userId }, { key: key, value: value })

    return { tryUpdate }
  }
}

export { UpdateUserUseCase }