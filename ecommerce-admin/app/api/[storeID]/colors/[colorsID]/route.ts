import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";


export async function GET(
  req: Request,
  { params }: { params: { storeID: string; colorsID: string } }
) {
  try {
    if (!params.colorsID) {
      return new NextResponse("colorsID id is required", { status: 400 });
    }

    const color = await prismadb.color.findUnique({
      where: { id: params.colorsID },
    });


    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_GET]", error);
    return new NextResponse("Internal ERROR", { status: 500 });
  }
}




export async function PATCH(
    req: Request,
    { params }: { params: { storeID: string; colorsID: string } }
) {
    try {
        const { userId } = await auth();
        const body = await req.json();
        const { name, value } = body as { name?: string, value?: string };

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!value) {
            return new NextResponse("Value is required", { status: 400 });
        }

        if (!params.colorsID) {
            return new NextResponse("colorsID id is required", { status: 400 });
        }

        const StoreByUserID= await prismadb.store.findFirst({
                    where:{
                        id:params.storeID,
                        userID:userId
                    }
                });
        
                if (!StoreByUserID){
                    return new NextResponse("Unauthorized", {status:403})
                }


        const color = await prismadb.color.updateMany({
            where: {
                id: params.colorsID,
            
            },
            data: { name,value },
        });

        // Optional: return 404 when nothing updated
        // if (result.count === 0) return new NextResponse("Not found", { status: 404 });

        return NextResponse.json(color);
    } catch (error) {
        console.log('[COLOR_PATCH]', error);
        return new NextResponse("Internal ERROR", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeID: string; colorsID: string } }
) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }
        if (!params.colorsID) {
            return new NextResponse("Size ID id is required", { status: 400 });
        }
        const StoreByUserID= await prismadb.store.findFirst({
                    where:{
                        id:params.storeID,
                        userID:userId
                    }
                });
        
                if (!StoreByUserID){
                    return new NextResponse("Unauthorized", {status:403})
                }

        const color = await prismadb.color.deleteMany({
            where: {
                id: params.colorsID,
                
            },
        });

        // Optional: return 404 when nothing deleted
        // if (result.count === 0) return new NextResponse("Not found", { status: 404 });

        return NextResponse.json(color);
    } catch (error) {
        console.log('[COLOR_DELETE]', error);
        return new NextResponse("Internal ERROR", { status: 500 });
    }
}


