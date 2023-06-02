import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import usersRouter from './app/modules/users/users.route'
const app: Application = express()

app.use(cors())

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application Routes
app.use('/api/v1/users/', usersRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world')
})

export default app
