import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { logger, errorLogger } from './shared/logger'
import { Server } from 'http'

// Uncaught Exception Error Handler
process.on('uncaughtException', error => {
  errorLogger.error(error)
  process.exit(1)
})

let server: Server

async function bootstrap() {
  try {
    // Connect to the database
    await mongoose.connect(config.database_url as string)
    logger.info('🔥 Database connected 🔥')

    // Start the server
    server = app.listen(config.port, () => {
      logger.info(`The app is running on port: ${config.port}`)
    })
  } catch (error) {
    // Log error if database connection fails
    errorLogger.error('Failed to connect database ', error)
  }

  // Gracefully shutting down the server in case of unhandled rejection
  process.on('unhandledRejection', error => {
    if (server) {
      // Close the server and log the error
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      // If server is not available, exit the process
      process.exit(1)
    }
  })
}
// Call the bootstrap function to start the application
bootstrap()

// Handling SIGTERM signal
process.on('SIGTERM', () => {
  logger.info('SIGTERM is received')
  if (server) {
    server.close()
  }
})
