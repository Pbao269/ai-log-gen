'use client'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { UserButton,useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { SignInButton } from '@clerk/nextjs'

function Header() {
  const {user} = useUser();
  return (
    <div className='px-10 lg:px-32 xl:px-48 2xl:px-56 p-4 flex items-center justify-between shadow-sm'>
      <Image src={'/logo.svg'} alt={'logo'} width={100} height={100} />
      <div className='flex items-center gap-4'>
      {user ? (
          <Link href="/dashboard" passHref>
            <Button>Dashboard</Button>
          </Link>
        ) : (
          <SignInButton mode="modal">
            <Button>Get started</Button>
          </SignInButton>
        )}

        <UserButton />
      </div>
    </div>
  )
}

export default Header
