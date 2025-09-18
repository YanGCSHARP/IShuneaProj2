import {format} from "date-fns"
import React from 'react'
import { BillboardClient } from './components/client'
import prismadb from '@/lib/prismadb'
import { BillboardColumn } from './components/columns'


const BillboardsPage = async ({
    params
  }: {
      params:Promise<{storeID: string}>;
    }
) => {
    const { storeID } = await params;
  const billboards= await prismadb.billboard.findMany({
    where:{
      storeID: storeID
    },
    orderBy:{
      createdAt:'desc'
    }
  });
  
  const formatedBillboards: BillboardColumn[] = billboards.map((item)=>({
    id:item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))
  
  return (
    <div className=' flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardClient data={formatedBillboards} />
        </div>
    </div>
  )
}

export default BillboardsPage