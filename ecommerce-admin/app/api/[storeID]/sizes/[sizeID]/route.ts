import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";


export async function GET(
  req: Request,
  { params }: { params: { storeID: string; sizeID: string } }
) {
  try {
    if (!params.sizeID) {
      return new NextResponse("sizeID id is required", { status: 400 });
    }

    const size = await prismadb.size.findUnique({
      where: { id: params.sizeID },
    });


    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_GET]", error);
    return new NextResponse("Internal ERROR", { status: 500 });
  }
}




export async function PATCH(
    req: Request,
    { params }: { params: { storeID: string; sizeID: string } }
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

        if (!params.sizeID) {
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


        const size = await prismadb.size.updateMany({
            where: {
                id: params.sizeID,
            
            },
            data: { name,value },
        });

        // Optional: return 404 when nothing updated
        // if (result.count === 0) return new NextResponse("Not found", { status: 404 });

        return NextResponse.json(size);
    } catch (error) {
        console.log('[SIZE_PATCH]', error);
        return new NextResponse("Internal ERROR", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeID: string; sizeID: string } }
) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }
        if (!params.sizeID) {
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

        const size = await prismadb.size.deleteMany({
            where: {
                id: params.sizeID,
                
            },
        });

        // Optional: return 404 when nothing deleted
        // if (result.count === 0) return new NextResponse("Not found", { status: 404 });

        return NextResponse.json(size);
    } catch (error) {
        console.log('[SIZE_DELETE]', error);
        return new NextResponse("Internal ERROR", { status: 500 });
    }
}


