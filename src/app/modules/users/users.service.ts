import config from '../../../config/index'
import ApiError from '../../../errors/ApiError'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generateUserId } from './users.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // Auto Generated Incremental ID
  const id = await generateUserId()
  user.id = id

  // Default Password
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  // Create User
  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user.')
  }
  return createdUser
}

export default {
  createUser,
}
