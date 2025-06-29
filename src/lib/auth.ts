import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export function verifyToken(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer '))
    throw new Error('Unauthorized');

  const token = authHeader.split(' ')[1];
  return jwt.verify(token, JWT_SECRET);
}