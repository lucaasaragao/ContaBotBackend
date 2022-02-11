import { inject, injectable } from "tsyringe"

import { INotesRepository } from "@modules/notes/repositories/INotesRepository"

@injectable()
class ListNotesUseCase {
  constructor(
    @inject("NotesRepository")
    private notesRepository: INotesRepository
  ) { }

  async execute({ page, limit, owner }) {
    let notes:any = await this.notesRepository.list({ owner })
    let totalNotes = notes.length
    notes = notes.reverse().slice((page - 1) * limit, limit * page)
    
    for (let note of notes) {
      note['found'] = note['found'].length
      note['errors'] = note['errors'].length
    }

    return { notes, totalNotes }
  }
} 

export { ListNotesUseCase }