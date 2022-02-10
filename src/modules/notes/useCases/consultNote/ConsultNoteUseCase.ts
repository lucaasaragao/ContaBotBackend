import { inject, injectable, container } from "tsyringe"
import { NotesProvider } from "@providers/notesProvider/implementations/NotesProvider"
import { INotesRepository } from "@modules/notes/repositories/INotesRepository"

import { AES } from "@utils/index"

@injectable()
class ConsultNoteUseCase {
  constructor(
    @inject("NotesRepository")
    private notesRepository: INotesRepository
  ) { }

  async execute({ authList, owner, qId }) {
    const aes = new AES()
    const notesProvider = container.resolve(NotesProvider)
    await this.notesRepository.create({ 
      owner, 
      qId, 
      loaded: authList.length 
    })

    for (let auth of authList) {
      const reference = aes.encrypt(`${auth.username}|${auth.password}`)
      let nfse = await notesProvider.get({ username: auth.username, password: auth.password })

      if (!nfse) {
        await this.notesRepository.push({ qId, key: "errors", value: reference })
      } else {
        nfse = aes.encrypt(nfse)
        await this.notesRepository.push({ qId, key: "found", value: { noteBuffer: nfse, reference } })
      }
    }
  }
}

export { ConsultNoteUseCase }