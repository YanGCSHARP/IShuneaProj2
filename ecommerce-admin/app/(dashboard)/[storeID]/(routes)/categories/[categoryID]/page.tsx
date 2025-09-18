import prismadb from '@/lib/prismadb'
import React from 'react'
import { CategoryForm } from './components/category-form'

const CategoryPage = async ({
  params,
}: {
  params: { categoryID: string; storeID: string }
}) => {
  const { categoryID, storeID } = params

  const category = await prismadb.category.findUnique({
    where: {
      id: categoryID,
    },
  });
   const billboards = await prismadb.billboard.findMany({
    where: {
      storeID: storeID,
    },
  })
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
