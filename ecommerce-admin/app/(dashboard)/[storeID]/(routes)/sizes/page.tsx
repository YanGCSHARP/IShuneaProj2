import {format} from "date-fns"
import React from 'react'
import { SizeClient } from './components/client'
import prismadb from '@/lib/prismadb'
import { SizeColumn } from './components/columns'


const SizesPage = async ({
    params
  }: {
      params:Promise<{storeID: string}>;
    }
) => {
    const { storeID } = await params;
  const sizes= await prismadb.size.findMany({
    where:{
      storeID: storeID
    },
    orderBy:{
      createdAt:'desc'
    }
  });
  
  const formattedSizes: SizeColumn[] = sizes.map((item)=>({
    id:item.id,
    name: item.name,
    value: item.value,
    createdAT: format(item.createdAt, "MMMM do, yyyy")
  }))
  
  return (
    <div className=' flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
        <SizeClient data={formattedSizes} />
        </div>
    </div>
  )
}

export default SizesPage