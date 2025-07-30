import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { createUser, deleteUser } from "@/lib/user";
import { UserExistsError, UserNotFoundError } from "@/lib/error";

export const GET = async () => {
    try{
        const [rows] = await pool.query('SELECT * FROM users');
        return new NextResponse(JSON.stringify(rows), {status: 200})
    }
    catch(err: any){
        return new NextResponse("Error in fetching users" + err.message, {status: 500})
    }
};

export const POST = async (request: Request) => {
    try{
        const body = await request.json();
        const {username, email} = body;
        const newUser = await createUser(username, email)
        return new NextResponse(JSON.stringify(newUser), {status: 201})
    }
    catch(err: any){
        if(err instanceof UserExistsError){
            return new NextResponse(err.message, {status: 409})
        }
        return new NextResponse("Error in handling post request: " + err.message, {status: 500})
    }
}

export const DELETE = async (request: Request) => {
    try{
        const {id} = await request.json();
        const res = await deleteUser(id);
        return new NextResponse(JSON.stringify(res), {status: 200})
    }
    catch(err){
        if(err instanceof UserNotFoundError){
            return new NextResponse(err.message, {status: 404})
        }
        return new NextResponse("Error in deleting request: " + (err as any).message, {status: 500})
    }
}