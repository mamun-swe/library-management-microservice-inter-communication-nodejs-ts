
import express from "express"
import * as AuthController from "../controllers/auth.controller"

export const authRouter = express.Router()

authRouter.post("/signup", AuthController.SignUp)
authRouter.post("/signin", AuthController.SignIn)