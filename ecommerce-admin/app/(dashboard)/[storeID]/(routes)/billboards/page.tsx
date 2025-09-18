import {format} from "date-fns"
import React from 'react'
import { BillboardClient } from './components/client'
import prismadb from '@/lib/prismadb'
import { BillboardColumn } from './components/columns'


const BillboardsPage = async ({
    params
  }: {
      params:{storeID: string}
    }
) => {
  const billboards= await prismadb.billboard.findMany({
    where:{
      storeID: params.storeID
    },
    orderBy:{
      createdAt:'desc'
    }
  });
  
  const formatedBillboards: BillboardColumn[] = billboards.map((item)=>({
    id:item.id,
    label: item.label,
    createdAT: format(item.createdAt, "MMMM do, yyyy")
  }))
  
  return (
    <div className=' flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardClient data={billboards} />
        </div>
    </div>
  )
}

export default BillboardsPage