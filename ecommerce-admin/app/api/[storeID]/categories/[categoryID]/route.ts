import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";


export async function GET(
  req: Request,
  { params }: { params: { storeID: string; categoryID: string } }
) {
  try {
    if (!params.categoryID) {
      return new NextResponse("categoryID id is required", { status: 400 });
    }

    const category = await prismadb.category.findUnique({
      where: { id: params.categoryID },
    });


    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_GET]", error);
    return new NextResponse("Internal ERROR", { status: 500 });
  }
}




export async function PATCH(
    req: Request,
    { params }: { params: { storeID: string; categoryID: string } }
) {
    try {
        const { userId } = await auth();
        const body = await req.json();
        const { name , billboardID } = body as { name?: string, billboardID?: string };

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!billboardID) {
            return new NextResponse("BillboardID is required", { status: 400 });
        }

        if (!params.categoryID) {
            return new NextResponse("categoryID id is required", { status: 400 });
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


        const category = await prismadb.category.updateMany({
            where: {
                id: params.categoryID,
            
            },
            data: { name,billboardID },
        });

        // Optional: return 404 when nothing updated
        // if (result.count === 0) return new NextResponse("Not found", { status: 404 });

        return NextResponse.json(category);
    } catch (error) {
        console.log('[CATEGORY_PATCH]', error);
        return new NextResponse("Internal ERROR", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeID: string; categoryID: string } }
) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }
        if (!params.categoryID) {
            return new NextResponse("Category id is required", { status: 400 });
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

        const category = await prismadb.category.deleteMany({
            where: {
                id: params.categoryID,
                
            },
        });

        // Optional: return 404 when nothing deleted
        // if (result.count === 0) return new NextResponse("Not found", { status: 404 });

        return NextResponse.json(category);
    } catch (error) {
        console.log('[CATEGORY_DELETE]', error);
        return new NextResponse("Internal ERROR", { status: 500 });
    }
}


