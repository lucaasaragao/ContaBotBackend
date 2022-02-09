import { Request, Response, NextFunction } from "express"
import * as JWT from "jsonwebtoken"

import { UsersRepository } from "@modules/users/repositories/implementations/UsersRepository"
import { AppError } from "@shared/errors/AppError"

async function extractToken(headers: any): Promise<string | null> {
  const authorization = headers['authorization']
  return authorization
}

async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> {
  const extractedToken = await extractToken(request.headers)

  let decodedToken
  try {
    decodedToken = JWT.verify(extractedToken, process.env.JWT_PUBLIC_KEY)
  } catch (decodeError) {
    throw new AppError({
      message: "Invalid Token",
      statusCode: 401,
    })
  }

  const userRepository = new UsersRepository()
  const user: any = await userRepository.find({ id: String(decodedToken.sub) })

  if (!user)
    throw new AppError({
      message: "User doesn't exists",
      statusCode: 404,
    })

  request.authenticatedUser = { id: user.id }
  next()
}

export { ensureAuthenticated }