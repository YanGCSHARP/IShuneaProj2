import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  context: { params: Promise<{ storeID: string }> }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { name, billboardID } = body;

    const { storeID } = await context.params; 

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!billboardID) {
      return new NextResponse("BillboardID is required", { status: 400 });
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

    const category = await prismadb.category.create({
      data: {
        name,
        billboardID,
        storeID,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
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

    if (!storeID) {
      return new NextResponse("StoreID is required", { status: 400 });
    }

    const categories = await prismadb.category.findMany({
      where: {
        storeID,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES_GET]", error);
    console.error("Full error details:", error);
    return new NextResponse(
      `Internal error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      { status: 500 }
    );
  }
}
