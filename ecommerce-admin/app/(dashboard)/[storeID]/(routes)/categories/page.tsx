import {format} from "date-fns"
import React from 'react'
import { CategoryClient } from './components/client'
import prismadb from '@/lib/prismadb'
import { CategoryColumn } from './components/columns'


const CategoriesPage = async ({
    params
  }: {
      params:{storeID: string}
    }
) => {
  const categories= await prismadb.category.findMany({
    where:{
      storeID: params.storeID
    },
    include:{
      billboard:true,
    },
    orderBy:{
      createdAt:'desc'
    }
  });
  
  const formatedCategories: CategoryColumn[] = categories.map((item)=>({
    id:item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAT: format(item.createdAt, "MMMM do, yyyy")
  }))
  
  return (
    <div className=' flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
        <CategoryClient data={formatedCategories} />
        </div>
    </div>
  )
}

export default CategoriesPage