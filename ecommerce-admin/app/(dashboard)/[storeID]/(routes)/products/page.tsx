import {format} from "date-fns"
import React from 'react'
import { ProductClient } from './components/client'
import prismadb from '@/lib/prismadb'
import { ProductColumn } from './components/columns'
import { formatter } from "@/lib/utils"


const ProductsPage = async ({
  params,
}: {
  params: Promise<{ storeID: string }>;
}) => {
  const { storeID } = await params; // 👈 теперь без ошибки

  const products = await prismadb.product.findMany({
    where: {
      storeID,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  
  const formatedProducts: ProductColumn[] = products.map((item)=>({
    id:item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAT: format(item.createdAt, "MMMM do, yyyy")
  }))
  
  return (
    <div className=' flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
        <ProductClient data={formatedProducts} />
        </div>
    </div>
  )
}

export default ProductsPage