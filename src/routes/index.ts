import { Router } from "express"
import { usersRoutes } from "./users.routes"
import { notesRoutes } from "./notes.routes"

const appRoutes = Router()

appRoutes.use("/users", usersRoutes)
appRoutes.use("/notes", notesRoutes)

export { appRoutes }