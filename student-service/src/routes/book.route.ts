
import express from "express"
import * as BookController from "../controllers/book.controller"

export const bookRouter = express.Router()

bookRouter.get("/", BookController.Index)
bookRouter.get("/:id", BookController.Show)