import { inject, injectable } from "tsyringe"

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"

@injectable()
class GetAllUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ page, limit, search }) {
    let allUsers = await this.usersRepository.listAll({ search: search })
    let totalUsers = allUsers.length

    allUsers.slice((page - 1) * limit, limit * page)

    return { users: allUsers, totalUsers }
  }
}

export { GetAllUsersUseCase }