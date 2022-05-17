
import express from "express"
import * as ProfileController from "../controllers/profile.controller"

export const profileRouter = express.Router()

profileRouter.get("/", ProfileController.Me)
profileRouter.put("/", ProfileController.Update)