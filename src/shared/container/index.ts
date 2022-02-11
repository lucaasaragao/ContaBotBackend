import { container } from "tsyringe"

import { UsersRepository } from "@modules/users/repositories/implementations/UsersRepository"
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository"

import { NotesRepository } from "@modules/notes/repositories/implementations/NotesRepository"
import { INotesRepository } from "@modules/notes/repositories/INotesRepository"

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)

container.registerSingleton<INotesRepository>(
  "NotesRepository",
  NotesRepository
)