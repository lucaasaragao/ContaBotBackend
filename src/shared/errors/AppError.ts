class AppError {
  public readonly message: string
  public readonly statusCode: number

  constructor({ message, statusCode }) {
    Object.assign(this, { message, statusCode })
  }
}

export { AppError }