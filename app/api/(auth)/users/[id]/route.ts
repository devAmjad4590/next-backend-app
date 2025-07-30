import { NextResponse } from "next/server";
import { updateUser } from "@/lib/user";
import { UserExistsError, UserNotFoundError } from "@/lib/error";

export const PATCH =  async (req: Request, {params}: {params: {id: string}}) => {
    try{
        const id = parseInt(params.id);
        if(isNaN(id)){
            return new NextResponse('Invalid User ID', {status: 400})
        }
    
        const {username, email} = await req.json();
        const user = await updateUser(id, username, email);
        return new NextResponse(JSON.stringify(user), {status: 200})
    }
    catch(err){
        if(err instanceof UserNotFoundError){
            return new NextResponse(err.message, {status: 404})
        }
        else if(err instanceof UserExistsError){
            return new NextResponse(err.message, {status: 409})
        }
        return new NextResponse("Error in updating the user data:" + (err as any).message, {status: 500})
    }
}