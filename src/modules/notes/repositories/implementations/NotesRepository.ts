import { Note } from "@modules/notes/entities/Notes"
import { injectable } from "tsyringe"
import { getRepository, Repository } from "typeorm"

import { INotesRepository } from "../INotesRepository"

@injectable()
class NotesRepository implements INotesRepository {
  private repository: Repository<Note>
  constructor() {
    this.repository = getRepository(Note)
  }

  async create({ owner, qId, loaded }): Promise<void> {
    const newNote = this.repository.create({ owner, qId, loaded, found: [], errors: [] })
    await this.repository.save(newNote)
  }

  async find({ qId }): Promise<Note | undefined> {
    return await this.repository.findOne({ qId })
  }

  async list({ owner }): Promise<Note[] | undefined> {
    return await this.repository.find({ owner })
  }

  async delete({ qId }): Promise<void> {
    await this.repository.delete({ qId })
  }

  async push({ qId, key, value }): Promise<void> {
    const note = await this.repository.findOne({ qId })
    note[key].push(value)
    await this.repository.save(note)
  }
}

export { NotesRepository }