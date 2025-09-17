import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server"
import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request,
){
    try{
        const {userId} = await auth();
        const body = await req.json();
        const {name} = body;
        if (!userId){
            return new NextResponse("Unanuthorized", {status:401})
        }
        if (!name){
            return new NextResponse("Name is required", {status:400})
        }
        const store = await prismadb.store.create({
            data: {
                name,
                userID: userId
            }
        });
        return NextResponse.json(store);
    } catch(error){
        console.log('[STORES_POST]', error);
        console.error('Full error details:', error);
        return new NextResponse(`Internal error: ${error instanceof Error ? error.message : 'Unknown error'}`, {status:500});
    }
}