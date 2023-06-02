import { Model, Schema, model } from 'mongoose'
import { IUser } from './users.interface'

// User Schema
export const userSchema = new Schema<IUser>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true, // It will add createdAt & updatedAt fields
  }
)

// User Model
type UserModel = Model<IUser, object>

export const User = model<IUser, UserModel>('User', userSchema)
