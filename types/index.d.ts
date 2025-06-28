import { Mongoose } from "mongoose";

export interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}