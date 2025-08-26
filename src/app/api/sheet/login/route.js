import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  const { username, password } = await request.json()

  const validUsername = process.env.LOGIN_USERNAME
  const hashedPassword = process.env.LOGIN_PASSWORD_HASH

  console.log("Username submitted:", username);
  console.log("Username expected :", validUsername);
  console.log("Password submitted:", JSON.stringify(password));
  console.log("Hash used:", hashedPassword);

  const passwordMatch = await bcrypt.compare(password, hashedPassword)
  console.log("Password match result:", passwordMatch)

  if (username !== validUsername) {
    return NextResponse.json({ success: false, message: 'Invalid username' }, { status: 401 })
  }

  if (!passwordMatch) {
    return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 })
  }

  return NextResponse.json({ success: true })
}
