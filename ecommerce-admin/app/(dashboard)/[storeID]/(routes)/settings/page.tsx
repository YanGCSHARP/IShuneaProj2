import React from 'react'
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';
import SettingsForm from './components/SettingsForm';
interface SettinsProps {
  params:{
    storeID: string;
  }
}
const SettingsPage: React.FC<SettinsProps> = async ({
  params
}) =>{
  const {userId} = await auth();

  if (!userId){
    redirect("/sign-in")
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeID,
      userID: userId,
    }
  })

  if (!store){
    redirect("/");
  }

  return(
    <div className='flex-col'>
    <div className='flex-1 space-y-4 p-8 pt-6'>
      <SettingsForm initialData={store}/>
      </div>
    </div>
  )
}

export default SettingsPage