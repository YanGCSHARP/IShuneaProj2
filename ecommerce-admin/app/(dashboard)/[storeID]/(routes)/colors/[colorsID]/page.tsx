import prismadb from '@/lib/prismadb'
import React from 'react'
import { ColorForm } from './components/color-form'

const ColorPage = async ({
  params,
}: {
  params: Promise<{ colorsID: string }>
}) => {
  const { colorsID } = await params; // 👈 ждем params

  const color = await prismadb.color.findUnique({
    where: {
      id: colorsID,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default ColorPage;
