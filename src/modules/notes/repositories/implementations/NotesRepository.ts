import { Note } from "@modules/notes/entities/Notes"
import { injectable } from "tsyringe"
import { getRepository, Repository } from "typeorm"

import { INotesRepository } from "../INotesRepository"

import { ObjectId } from "mongodb"


@injectable()
class NotesRepository implements INotesRepository {
  private repository: Repository<Note>
  constructor() {
    this.repository = getRepository(Note)
  }

  async create({ owner, noteBff }): Promise<void> {
    const newNote = this.repository.create({ owner, noteBff })
    await this.repository.save(newNote)
  }

  async find({ id }): Promise<Note | undefined> {
    if (id) id = new ObjectId(id)
    return await this.repository.findOne({ id })
  }

  async list({ owner }): Promise<Note[] | undefined> {
    return await this.repository.find({ owner })
  }

  async delete({ id }): Promise<void> {
    if (id) id = new ObjectId(id)
    await this.repository.delete({ id })
  }
}

export { NotesRepository }