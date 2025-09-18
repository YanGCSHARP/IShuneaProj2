import prismadb from '@/lib/prismadb'
import React from 'react'
import { BillboardForm } from './components/billboard-form'

const BillboardPage = async ({
  params,
}: {
  params: Promise<{ billboardID: string }>
}) => {
  const { billboardID } = await params; // 👈 ждем params

  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: billboardID,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
