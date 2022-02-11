import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
  ObjectID,
} from "typeorm"

@Entity("users")
class User {
  @ObjectIdColumn()
  readonly id: ObjectID

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  password: string

  @Column('boolean', { default: false })
  isAdmin: boolean

  @Column('boolean', { default: false })
  isEnabled: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column()
  resetPasswordToken: string

  @Column()
  resetPasswordExpiresIn: string

}

export { User }