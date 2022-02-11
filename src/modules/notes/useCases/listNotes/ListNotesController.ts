import { Request, Response } from "express"
import { container } from "tsyringe"

import { ListNotesUseCase } from "./ListNotesUseCase"

class ListNotesController {
  async handle(request: Request, response: Response) {
    const listNotesUseCase = container.resolve(ListNotesUseCase)
    const owner = request.authenticatedUser.id.toString()
    const { page, limit } = request.query

    const notesData = await listNotesUseCase.execute({
      page,
      limit,
      owner
    })

    return response.status(201).send({ status: "success", ...notesData })
  }
}

export { ListNotesController }