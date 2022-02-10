import { Router } from "express"

import { ConsultNoteController } from "@modules/notes/useCases/consultNote/ConsultNoteController"

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"

const consultNoteController = new ConsultNoteController()

const notesRoutes = Router()

notesRoutes.post("/consult", ensureAuthenticated, consultNoteController.handle)

export { notesRoutes }