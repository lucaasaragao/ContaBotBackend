import { User } from "../entities/User"
import { IUserCreateDTO } from "../dtos/IUserCreateDTO"
import { IAuthenticateUserDTO } from "../dtos/IAuthenticateUserDTO"
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO"

interface IUsersRepository {
  create({ username, password }: IUserCreateDTO): Promise<void>
  find({ username, id }: IAuthenticateUserDTO): Promise<User | undefined>
  listAll({ search }): Promise<User[] | []>
  update({ username, id }: IAuthenticateUserDTO, { key, value }: IUpdateUserDTO): Promise<any>
  hashPassword(password: string): Promise<string>
  comparePassword(password: string, passwordHash: string): Promise<boolean | undefined>
}

export { IUsersRepository }