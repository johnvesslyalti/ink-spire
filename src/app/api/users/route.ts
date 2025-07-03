import { connectToDB } from 'lib/db'
import User from 'models/User'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectToDB() 

    const users = await User.find()
    return NextResponse.json(users, { status: 200 })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
