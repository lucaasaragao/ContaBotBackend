import { Request, Response } from "express"
import { container } from "tsyringe"

import { ConsultNoteUseCase } from "./ConsultNoteUseCase"

import { randomStr } from "@utils/index"

class ConsultNoteController {
  async handle(request: Request, response: Response): Promise<Response> {
    const cType = request['headers']['content-type']
    const consultNoteUseCase = container.resolve(ConsultNoteUseCase)
    const owner = request.authenticatedUser.id.toString()
    const authList = []
    const qId = randomStr(24)

    if (cType.includes("application/json")) {
      const { username, password } = request.body
      authList.push({ username, password })
    } else if (cType.includes("application/vnd.ms-excel") || cType.includes("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {

    } else {
      return response.status(400).send({ status: "failure", message: "Tipo de entrada invalida." })
    }

    consultNoteUseCase.execute({ 
      authList, 
      owner,
      qId
    })

    return response.status(201).send({ status: "success", qId })
  }
}

export { ConsultNoteController }