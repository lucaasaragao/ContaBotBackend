import { inject, injectable, container } from "tsyringe"
import { NotesProvider } from "@providers/notesProvider/implementations/NotesProvider"
import { INotesRepository } from "@modules/notes/repositories/INotesRepository"

@injectable()
class ConsultNoteUseCase {
  constructor(
    @inject("NotesRepository")
    private notesRepository: INotesRepository
  ) { }

  async execute({ authList, owner, qId }) {
    const notesProvider = container.resolve(NotesProvider)
    await this.notesRepository.create({ 
      owner, 
      qId, 
      loaded: authList.length 
    })

    for (let auth of authList) {
      const reference = `${auth.username}|${auth.password}`
      const nfse = await notesProvider.get({ ...auth })

      if (!nfse) {
        await this.notesRepository.push({ qId, key: "errors", value: reference })
      } else {
        await this.notesRepository.push({ qId, key: "found", value: { noteBuffer: nfse, reference } })
      }
    }
  }
}

export { ConsultNoteUseCase }