import { Schema, Document } from 'mongoose';

const postSchema = new Schema(
  {
    title: String,
    description: String,
    content: String,
  },
  {
    timestamps: true,
    collection: 'posts',
  },
);

export { postSchema };
export interface Post extends Document {
  title: string;
  description: string;
  content: string;
}
