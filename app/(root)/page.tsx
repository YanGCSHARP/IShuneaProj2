"use client"
import { Modal } from "@/components/ui/modal"
import { Button, buttonVariants } from "@/components/ui/button"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/dist/client/components/navigation"
import { useStoreModal } from "@/hooks/use-store-modal"
import { stat } from "fs"
import { useEffect } from "react"

const SetupPage = () => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen(); 
    }
  }, [isOpen, onOpen]);

  return (
    <div className="container flex h-[800px] flex-col items-center justify-center">
      Root Page
    </div>
  );
}

export default SetupPage