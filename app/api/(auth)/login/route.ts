import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getUserByEmail } from '@/lib/user';
import { UserExistsError, UserNotFoundError } from '@/lib/error';

const SECRET = '123' // too lazy to place it in .env

export const POST = async (req: NextRequest) => {
    try{
    const {username, email} = await req.json()
    const user = await getUserByEmail(email);
    if(user.username == username && user.email == email){
        return new NextResponse("Login Works!", {status: 200})
    }
    throw new UserNotFoundError
}
catch(err){
    if(err instanceof UserExistsError){
        return new NextResponse(err.message)
    }
    return new NextResponse("Error in login: " + (err as any).message, {status: 500})
}
}