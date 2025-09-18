import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";


export async function GET(
  req: Request,
  { params }: { params: { storeID: string; billboardID: string } }
) {
  try {
    if (!params.billboardID) {
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    const billboard = await prismadb.billboard.findUnique({
      where: { id: params.billboardID },
    });

    if (!billboard) {
      return new NextResponse("Not found", { status: 404 });
    }

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
    return new NextResponse("Internal ERROR", { status: 500 });
  }
}




export async function PATCH(
    req: Request,
    { params }: { params: { storeID: string; billboardID: string } }
) {
    try {
        const { userId } = await auth();
        const body = await req.json();
        const { label, imageUrl } = body as { label?: string, imageUrl?: string };

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }
        if (!label) {
            return new NextResponse("Label is required", { status: 400 });
        }

        if (!imageUrl) {
            return new NextResponse("ImageURL is required", { status: 400 });
        }

        if (!params.billboardID) {
            return new NextResponse("Billboard id is required", { status: 400 });
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


        const billboard = await prismadb.billboard.updateMany({
            where: {
                id: params.billboardID,
            
            },
            data: { label,imageUrl },
        });

        // Optional: return 404 when nothing updated
        // if (result.count === 0) return new NextResponse("Not found", { status: 404 });

        return NextResponse.json(billboard);
    } catch (error) {
        console.log('[BILLBOARD_PATCH]', error);
        return new NextResponse("Internal ERROR", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeID: string; billboardID: string } }
) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }
        if (!params.billboardID) {
            return new NextResponse("Billboard id is required", { status: 400 });
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

        const billboard = await prismadb.billboard.deleteMany({
            where: {
                id: params.billboardID,
                
            },
        });

        // Optional: return 404 when nothing deleted
        // if (result.count === 0) return new NextResponse("Not found", { status: 404 });

        return NextResponse.json(billboard);
    } catch (error) {
        console.log('[BILLBOARD_DELETE]', error);
        return new NextResponse("Internal ERROR", { status: 500 });
    }
}


