import prismadb from "@/lib/prismadb"

export default async function DashboardPage({
    params,
}: {
    params: Promise<{ storeID: string }>
}) {
    const { storeID } = await params;
    const store = await prismadb.store.findFirst({
        where: {
            id: storeID,
        },
    });

    return (
        <div>
           Active store : {store?.name}
        </div>
    );
}