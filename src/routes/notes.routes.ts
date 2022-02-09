import { Router } from "express"

import { SaveNoteController } from "@modules/notes/useCases/saveNote/SaveNoteControllers"

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"

const saveNoteController = new SaveNoteController()

const notesRoutes = Router()

notesRoutes.post("/save", ensureAuthenticated, saveNoteController.handle)

export { notesRoutes }