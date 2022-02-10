import {
  Entity,
  Column,
  ObjectIdColumn,
  ObjectID
} from "typeorm"

import { INoteDTO } from "../dtos/INoteDTO"

@Entity("notes")
class Note {
  @ObjectIdColumn()
  readonly id: ObjectID

  @Column()
  owner: string

  @Column()
  qId: string

  @Column()
  found: INoteDTO[]

  @Column()
  errors: string[]

  @Column()
  loaded: number
}

export { Note }