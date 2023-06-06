import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

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
);

export const User = model<IUser, UserModel>('User', userSchema);
