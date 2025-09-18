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

    const color = await prismadb.color.create({
      data: {
        name,
        value,
        storeID,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLORS_POST]", error);
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

    const colors = await prismadb.color.findMany({
      where: {
        storeID,
      },
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.log("[COLOR_GET]", error);
    console.error("Full error details:", error);
    return new NextResponse(
      `Internal error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      { status: 500 }
    );
  }
}
