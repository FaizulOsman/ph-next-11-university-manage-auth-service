import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { logger, errorLogger } from './shared/logger'

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('🔥 Database connected 🔥')

    app.listen(config.port, () => {
      logger.info(`The app is running on port: ${config.port}`)
    })
  } catch (error) {
    errorLogger.error('Failed to connect database ', error)
  }
}
bootstrap()
