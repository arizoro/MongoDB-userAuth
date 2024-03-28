import express from 'express'
import usersController from '../controller/usersController.js'
// import customersController from '../controller/customersController.js'

export const publicApi = new express.Router()

publicApi.post('/api/create', usersController.register)
publicApi.post('/api/login', usersController.login)
