import { NextResponse } from "next/server";
import pool from "@/lib/db";

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
        
    }
    catch(err: any){
        return new NextResponse("Error in handling post request: " + err.message, {status: 500})
    }
}