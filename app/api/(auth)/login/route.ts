import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getUserByEmail } from "@/lib/user";
import { UserExistsError, UserNotFoundError } from "@/lib/error";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

const SECRET = "123"; // too lazy to place it in .env

export const POST = async (req: NextRequest) => {
  try {
    const { username, email } = await req.json();
    const user = await getUserByEmail(email);
    if (user.username == username && user.email == email) {
      const token = jwt.sign({ username: user.username, email: user.email }, SECRET, {
        expiresIn: "7d",
      });

      const response = NextResponse.json({ message: "Login successful" }, {status: 200});
      response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/", // all routes
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return response
    }
    throw new UserNotFoundError();
  } catch (err) {
    if (err instanceof UserExistsError) {
      return new NextResponse(err.message);
    }
    return new NextResponse("Error in login: " + (err as any).message, {
      status: 500,
    });
  }
};


export const GET = async (req: NextRequest) => {
    try{
        const user = await verifyToken();
        console.log(user)
        return NextResponse.json(user, {status: 200})
    }
    catch(err){
        return new NextResponse("Error in Getting user's token: " + (err as any).message, {status: 401})
    }
} 
