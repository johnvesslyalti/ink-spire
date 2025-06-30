import bcrypt from "bcryptjs";
import { connectToDB } from "lib/db";
import User from "models/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDB();

    if(req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const {name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if(existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({ name, email, password: hashedPassword, role: role || 'user' });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' })
}