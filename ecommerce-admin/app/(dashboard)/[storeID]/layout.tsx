import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";
import type { ReactNode } from "react";
import Navbar from "@/components/navbar";
export default async function DashboardLayout({
    children,
    params 
}: {
    children:ReactNode
    params: Promise<{storeID: string}>
}) {
    const { storeID } = await params;
    const { userId } = await auth();
    if (!userId){
        redirect ('/sign-in')
    }
    const store = await prismadb.store.findFirst({
        where:{
            id:storeID,
            userID: userId
        }
    });
    if(!store){
        redirect('/')
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}