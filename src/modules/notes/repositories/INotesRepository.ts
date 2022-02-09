import { Note } from "@modules/notes/entities/Notes"

interface INotesRepository {
  create({ owner, noteBff }): Promise<void>
  find({ id }): Promise<Note | undefined>
  list({ owner }): Promise<Note[] | undefined>
  delete({ id }): Promise<void>
}

export { INotesRepository }