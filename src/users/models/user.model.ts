import { Schema, Document } from 'mongoose';

const userSchema = new Schema(
  {
    email: String,
    password: String,
    fullName: String,
  },
  {
    timestamps: true,
    collection: 'users',
  },
);

export { userSchema };
export interface User extends Document {
  email: string;
  password: string;
  fullName: string;
}
