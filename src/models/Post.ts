import { Schema, Document, models, model } from 'mongoose';

export interface IPost extends Document {
    title: string;
    content: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema: Schema = new Schema<IPost>(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        }
    },
    {
        timestamps: true,
    }
);

export const Post = models.Post || model<IPost>("Post", PostSchema);