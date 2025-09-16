"use client"
import { Modal } from "@/components/ui/modal"
import { Button, buttonVariants } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex h-screen w-screen items-center justify-center ">
      <Modal title="Example Modal" isOpen={true} onClose={() => {}}>
        <p>This is an example modal</p>
      </Modal>
        <Button size="default">Click</Button>
    </div>
  )
}