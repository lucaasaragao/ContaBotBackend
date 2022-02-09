import { Request, Response, NextFunction } from "express"
import { AppError } from "@shared/errors/AppError"

export default async function handleExceptions(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response> {
  console.log(error)
  if (error instanceof AppError) {
    return response
      .status(error.statusCode)
      .json({ status: "failure", message: error.message })
  }
  return response
    .status(500)
    .json({ status: "error", message: "Internal Server Error" })
}


