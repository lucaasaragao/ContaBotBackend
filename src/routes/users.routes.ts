import { Router } from "express"

import { CreateUserController } from "@modules/users/useCases/createUser/CreateUserController"
import { AuthenticateUserController } from "@modules/users/useCases/authenticateUser/AuthenticateUserController"
import { GetUserProfileController } from "@modules/users/useCases/getUserProfile/GetUserProfileController"
import { ForgetPasswordUserController } from "@modules/users/useCases/forgetPasswordUser/ForgetPasswordUserController"
import { GetAllUsersController } from "@modules/users/useCases/getAllUsers/getAllUsersController"
import { UpdateUserController } from "@modules/users/useCases/updateUser/updateUserController"

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated"
import { ensureAdmin } from "../middlewares/ensureAdmin"

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const getUserProfileUserController = new GetUserProfileController()
const forgetPasswordUserController = new ForgetPasswordUserController()
const getAllUsersController = new GetAllUsersController()
const updateUserController = new UpdateUserController()

const usersRoutes = Router()

usersRoutes.post("/register", createUserController.handle)
usersRoutes.post("/login", authenticateUserController.handle)
usersRoutes.post("/forget-password", forgetPasswordUserController.handle)
usersRoutes.get("/profile", ensureAuthenticated, getUserProfileUserController.handle)


usersRoutes.get("/all-users", ensureAuthenticated, ensureAdmin, getAllUsersController.handle)
usersRoutes.post("/update-user", ensureAuthenticated, ensureAdmin, updateUserController.handle)

export { usersRoutes }