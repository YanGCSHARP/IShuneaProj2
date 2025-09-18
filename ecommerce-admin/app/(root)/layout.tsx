"use client"
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs'

export default function RootSegmentLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        {children}
      </SignedIn>
    </>
  )
}


