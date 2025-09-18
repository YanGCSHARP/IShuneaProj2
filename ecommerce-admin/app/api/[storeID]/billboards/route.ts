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
    const { label, imageUrl } = body;

    const { storeID } = await context.params; 

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("ImageURL is required", { status: 400 });
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

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeID,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_POST]", error);
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

    const billboards = await prismadb.billboard.findMany({
      where: {
        storeID,
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[BILLBOARD_GET]", error);
    console.error("Full error details:", error);
    return new NextResponse(
      `Internal error: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      { status: 500 }
    );
  }
}
