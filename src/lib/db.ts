import mongoose, { Mongoose } from 'mongoose';

export interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
    throw new Error('Please define the MONGOBD_URI environment variable inside .env.local');
}

const globalWithMongoose = global as typeof globalThis & {
    mongoose: MongooseConnection;
}

if (!globalWithMongoose.mongoose) {
    globalWithMongoose.mongoose = { conn: null, promise: null }
}

export async function connectToDB(): Promise<Mongoose> {
    if (globalWithMongoose.mongoose.conn) return globalWithMongoose.mongoose.conn;
    
    if(!globalWithMongoose.mongoose.promise) {
        globalWithMongoose.mongoose.promise = mongoose.connect(MONGODB_URI, {
            dbName: 'blogDB',
            bufferCommands: false,
        })
    }

    globalWithMongoose.mongoose.conn = await globalWithMongoose.mongoose.promise;
    return globalWithMongoose.mongoose.conn;
}