import { Router } from "express"

import { ConsultNoteController } from "@modules/notes/useCases/consultNote/ConsultNoteController"
import { ListNotesController } from "@modules/notes/useCases/listNotes/ListNotesController"

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"

const consultNoteController = new ConsultNoteController()
const listNotesController = new ListNotesController()

const notesRoutes = Router()

notesRoutes.post("/consult", ensureAuthenticated, consultNoteController.handle)
notesRoutes.get("/list", ensureAuthenticated, listNotesController.handle)

export { notesRoutes }