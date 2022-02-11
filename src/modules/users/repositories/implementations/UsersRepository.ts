import { getRepository, Repository } from "typeorm"

import { IUserCreateDTO } from "@modules/users/dtos/IUserCreateDTO"
import { IAuthenticateUserDTO } from "@modules/users/dtos/IAuthenticateUserDTO"
import { IUpdateUserDTO } from "@modules/users/dtos/IUpdateUserDTO"

import { User } from "@modules/users/entities/User"
import { IUsersRepository } from "../IUsersRepository"

import bcrypt from "bcryptjs"

import { ObjectId } from "mongodb"

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async find({ username, id }: IAuthenticateUserDTO): Promise<User | undefined> {
    if (id) id = new ObjectId(id)
    let user = await this.repository.findOne({
      where: { $or: [{ username }, { _id: id }] },
    })
    return user 
  }

  async update({ username, id }: IAuthenticateUserDTO, { key, value }: IUpdateUserDTO): Promise<any> {
    let userToUpdate = await this.find({ username, id })

    if (key in userToUpdate) {
      userToUpdate[key] = value
      await this.repository.save(userToUpdate)
    } else {
      await this.repository.update({ username, id }, { [key]: value })
    }

    return await this.find({ username, id })
  }

  async create({ username, password }: IUserCreateDTO): Promise<void> {
    const user = this.repository.create({ username, password  })
    await this.repository.save(user)
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 8)
  }

  async comparePassword(password: string, passwordHash: string): Promise<boolean | undefined> {
    return await bcrypt.compare(password, passwordHash)
  }

  async listAll({ search }): Promise<User[] | []> {
    if (search)
      return await this.repository.find({ username: search })
    return await this.repository.find({})
  }
}

export { UsersRepository }