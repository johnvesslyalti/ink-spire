import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET!

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, SECRET)
    return NextResponse.json({ user: payload })
  } catch (err) {
    return NextResponse.json({ error: 'Invalid token', err}, { status: 401 })
  }
}
