import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function PATCH(
    req: Request,
    { params }: { params: { storeID: string } }
) {
    try {
        const { userId } = await auth();
        const body = await req.json();
        const { name } = body as { name?: string };

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }
        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }
        if (!params.storeID) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const result = await prismadb.store.updateMany({
            where: {
                id: params.storeID,
                userID: userId,
            },
            data: { name },
        });

        // Optional: return 404 when nothing updated
        // if (result.count === 0) return new NextResponse("Not found", { status: 404 });

        return NextResponse.json(result);
    } catch (error) {
        console.log('[STORE_PATCH]', error);
        return new NextResponse("Internal ERROR", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeID: string } }
) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }
        if (!params.storeID) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const result = await prismadb.store.deleteMany({
            where: {
                id: params.storeID,
                userID: userId,
            },
        });

        // Optional: return 404 when nothing deleted
        // if (result.count === 0) return new NextResponse("Not found", { status: 404 });

        return NextResponse.json(result);
    } catch (error) {
        console.log('[STORE_DELETE]', error);
        return new NextResponse("Internal ERROR", { status: 500 });
    }
}


