import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    role: 'user' | 'admin';
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'role'],
        default: 'user',
    }
})

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);