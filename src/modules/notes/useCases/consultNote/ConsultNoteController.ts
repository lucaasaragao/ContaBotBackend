import { Request, Response } from "express"
import { container } from "tsyringe"

import { ConsultNoteUseCase } from "./ConsultNoteUseCase"

import { randomStr, saveBodyFile, xlsxJson } from "@utils/index"

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
    } else if (cType.includes("multipart/form-data")) {
      const z:any = await saveBodyFile(request)
      const jsonData:any = await xlsxJson(z.file)
      
      if (!jsonData[0].hasOwnProperty('usuario'))
        return response.status(400).send({ status: "failure", message: "Seu arquivo excel precisa conter a coluna 'usuario'." })
      if (!jsonData[0].hasOwnProperty('senha'))
        return response.status(400).send({ status: "failure", message: "Seu arquivo excel precisa conter a coluna 'senha''." })
      if (typeof jsonData[0].usuario !== "string" || typeof jsonData[0].senha !== "string")
        return response.status(400).send({ status: "failure", message: "As colunas precisam serem formatadas para 'Texto'" })
      if (jsonData.length > 250)
        return response.status(400).send({ status: "failure", message: "Voce ultrapassou o limite de 250 linhas" })

      for (let auth of jsonData)
        authList.push({ 
          username: auth['usuario'], 
          password: auth['senha'] 
        })
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