import { Request, Response } from "express"
import { container } from "tsyringe"

import { SaveNoteUseCase } from "./SaveNoteUseCase"

class SaveNoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const cType = request['headers']['content-type']
    const saveNoteUseCase = container.resolve(SaveNoteUseCase)
    const owner = request.authenticatedUser.id.toString()

    if (cType.includes("application/json")) {
      const { username, password } = request.body
      const resultNfse = await saveNoteUseCase.execute({ 
        authList: [ { username, password } ], 
        owner  
      })

      return response.status(201).send({ status: "success", ...resultNfse })

    }

    return response.status(400).send({ status: "failure", message: "Tipo de arquivo/texto invalido" })
  }
}

export { SaveNoteController }