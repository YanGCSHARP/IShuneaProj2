import prismadb from '@/lib/prismadb'
import React from 'react'
import { ProductForm } from './components/product-form'

const ProductPage = async ({
  params,
}: {
  params: { productID: string, storeID: string }
}) => {
  const { productID } =  await params; // 👈 ждем params

  const product = await prismadb.product.findUnique({
    where: {
      id: productID,
    },
    include:{
      images:true,
    }
  });

  const categories = await prismadb.category.findMany({
    where:{
      storeID: params.storeID,
    },
  })

  const sizes = await prismadb.size.findMany({
    where:{
      storeID: params.storeID,
    },
  })

  const colors = await prismadb.color.findMany({
    where:{
      storeID: params.storeID,
    },
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm 
        categories={categories}
        colors={colors}
        sizes={sizes}
        initialData={product} />
      </div>
    </div>
  );
};

export default ProductPage;
