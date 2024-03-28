import express from "express"
import usersController from "../controller/usersController.js"
import { authUser } from "../middleware/authUser.js"


export const api = new express.Router()
api.use(authUser)

api.get('/api/users', usersController.get)
api.patch('/api/users', usersController.update)
api.delete('/api/users', usersController.logout)