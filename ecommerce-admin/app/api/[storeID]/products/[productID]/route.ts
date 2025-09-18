import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";


export async function GET(
  req: Request,
  { params }: { params: { storeID: string; productID: string } }
) {
  try {
    if (!params.productID) {
      return new NextResponse("productID id is required", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: { id: params.productID },
    include:{
        images:true,
        category: true,
        size: true,
        color: true,
        }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal ERROR", { status: 500 });
  }
}




export async function PATCH(
    req: Request,
    { params }: { params: { storeID: string; productID: string } }
) {
    try {
        const { userId } = await auth();
        const body = await req.json();
const { 
      name,
      price,
      categoryID,
      colorID,
      sizeID,
      images,
      isFeatured,
      isArchived,
     } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!name) {
      return new NextResponse("Name is required", { status: 400 });
        }

        if (!price) {
      return new NextResponse("Price is required", { status: 400 });
        }

        if (!categoryID) {
        return new NextResponse("categoryID is required", { status: 400 });
        }

        if (!colorID) {
          return new NextResponse("colorID is required", { status: 400 });
        }

        if (!sizeID) {
          return new NextResponse("sizeID is required", { status: 400 });
        }

        if (!images || !images.length) {
          return new NextResponse("Images is required", { status: 400 });
        }

        if (!params.productID) {
            return new NextResponse("productID id is required", { status: 400 });
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


        await prismadb.product.update({
            where: {
                id: params.productID,
            
            },
            data: { 
                name,
                price,
                categoryID,
                colorID,
                sizeID,
                images:{
                    deleteMany:{}
                },
             isFeatured,
             isArchived,
            }
        });

    const product = await prismadb.product.update({
    where: {
        id: params.productID,
    },
    data: {
        images: {
            createMany: {
                data: [
                    ...images.map((image: { url: string }) => image)
                ]
            }
        }
    } 
});

        // Optional: return 404 when nothing updated
        // if (result.count === 0) return new NextResponse("Not found", { status: 404 });

        return NextResponse.json(product);
    } catch (error) {
        console.log('[PRODUCTS_PATCH]', error);
        return new NextResponse("Internal ERROR", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeID: string; productID: string } }
) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }
        if (!params.productID) {
            return new NextResponse("productID id is required", { status: 400 });
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

        const product = await prismadb.product.deleteMany({
            where: {
                id: params.productID,
                
            },
        });

        // Optional: return 404 when nothing deleted
        // if (result.count === 0) return new NextResponse("Not found", { status: 404 });

        return NextResponse.json(product);
    } catch (error) {
        console.log('[PRODUCT_DELETE]', error);
        return new NextResponse("Internal ERROR", { status: 500 });
    }
}


