import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";
import { StoreSetupOpener } from "@/components/store-setup-opener";

export default async function Home() {
  const { userId } = await auth();
  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({
    where: {
      userID: userId
    }
  });

  if (store) {
    redirect(`/${store.id}`);
  }

  return <StoreSetupOpener />;
}
