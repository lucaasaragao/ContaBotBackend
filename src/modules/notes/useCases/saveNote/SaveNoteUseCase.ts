import { inject, injectable, container } from "tsyringe"
import { NotesProvider } from "@providers/notesProvider/implementations/NotesProvider";
import { INotesRepository } from "@modules/notes/repositories/INotesRepository";

@injectable()
class SaveNoteUseCase {
  constructor(
    @inject("NotesRepository")
    private notesRepository: INotesRepository
  ) { }

  async execute({ authList, owner }) {
    const notesProvider = container.resolve(NotesProvider)
    let info = { 
      loaded: authList.length, 
      saved: 0,
      errors: []
    }
    
    for (let auth of authList) {
      console.log({ ...auth })
      const nfse = await notesProvider.get({ ...auth })
      if (!nfse) {
        info.errors.push(auth)
      } else {
        info.saved++
        await this.notesRepository.create({ owner, noteBff: nfse })
      }
    }

    return info
  }
}

export { SaveNoteUseCase }