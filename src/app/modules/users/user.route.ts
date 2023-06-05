import express from 'express'
import { UserController } from './user.controller'
const router = express.Router()

// Routes
router.post('/create-user', UserController.createUser)

export const UserRoutes = router
