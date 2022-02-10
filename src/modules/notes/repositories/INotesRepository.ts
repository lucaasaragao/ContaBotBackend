import { Note } from "@modules/notes/entities/Notes"

interface INotesRepository {
  create({ owner, qId, loaded }): Promise<void>
  find({ qId }): Promise<Note | undefined>
  list({ owner }): Promise<Note[] | undefined>
  delete({ qId }): Promise<void>
  push({ qId, key, value }): Promise<void>
}

export { INotesRepository }