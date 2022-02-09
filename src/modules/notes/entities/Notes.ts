import {
  Entity,
  Column,
  ObjectIdColumn,
  ObjectID
} from "typeorm"

@Entity("notes")
class Note {
  @ObjectIdColumn()
  readonly id: ObjectID

  @Column()
  owner: string

  @Column()
  noteBff: string
}

export { Note }