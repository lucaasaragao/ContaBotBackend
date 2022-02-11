import { Request, Response, NextFunction } from "express"

import { UsersRepository } from "@modules/users/repositories/implementations/UsersRepository"
import { AppError } from "@shared/errors/AppError"

async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> {
  const userRepository = new UsersRepository()
  const userId = request.authenticatedUser.id.toString()
  const user: any = await userRepository.find({ id: userId })

  if (!user.isAdmin)
    throw new AppError({
      message: "User doesn't is a admin",
      statusCode: 401
    })

  return next()
}

export { ensureAdmin }