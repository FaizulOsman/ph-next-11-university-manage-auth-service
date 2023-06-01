import express from 'express'
import usersController from './users.controller'
const router = express.Router()

// Routes
router.post('/create-user', usersController.createUser)

export default router
