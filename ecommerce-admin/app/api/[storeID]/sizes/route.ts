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
    const { name,value } = body;

    const { storeID } = await context.params; 

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
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

    const size = await prismadb.size.create({
      data: {
        name,
        value,
        storeID,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZES_POST]", error);
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

    const sizes = await prismadb.size.findMany({
      where: {
        storeID,
      },
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.log("[SIZES_GET]", error);
    console.error("Full error details:", error);
    return new NextResponse(
      `Internal error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      { status: 500 }
    );
  }
}
