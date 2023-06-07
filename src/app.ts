import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
const app: Application = express();

app.use(cors());

// middleware/parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Routes
app.use('/api/v1/', routes);

// // Testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing error logger')
// })

// Global Error Handler
app.use(globalErrorHandler);

export default app;
