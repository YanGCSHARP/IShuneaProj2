import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";
import { create } from "domain";

export async function POST(
  req: Request,
  context: { params: Promise<{ storeID: string }> }
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

    const { storeID } = await context.params; 

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
    if (!storeID) {
      return new NextResponse("StoreID is required", { status: 400 });
    }

    const StoreByUserID = await prismadb.store.findFirst({
      where: {
        id: storeID,
        userID: userId,
      },
    });

    if (!StoreByUserID) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        categoryID,
        colorID,
        sizeID,
        isFeatured,
        isArchived,
        storeID: storeID,
        images: {
          createMany: {
            data:[
              ...images.map((image: { url: string }) => image)
            ]
          }
        }
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    console.error("Full error details:", error);
    return new NextResponse(
      `Internal error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  context: { params: Promise<{ storeID: string }> }
) {
  try {
    const { storeID } = await context.params; 

    const {searchParams}=new URL(req.url)
    const categoryID=searchParams.get('categoryID') || undefined;
    const colorID=searchParams.get('colorID') || undefined;
    const sizeID=searchParams.get('sizeID') || undefined;
    const isFeatured=searchParams.get('isFeatured');
    if (!storeID) {
      return new NextResponse("StoreID is required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeID,
        categoryID,
        colorID,
        sizeID,
        isFeatured: isFeatured? true: undefined,
        isArchived:false,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
      orderBy:{
        createdAt: 'desc'
      }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    console.error("Full error details:", error);
    return new NextResponse(
      `Internal error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      { status: 500 }
    );
  }
}
