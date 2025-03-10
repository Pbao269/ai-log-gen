'use client'
import { Button } from '@/components/ui/button';
import React, { useContext } from 'react'
import { UserDetailContext } from '@/app/_context/UserDetailContext';
import Link from 'next/link';



function Info() {
  const {userDetail, setUserDetail} = useContext(UserDetailContext);
  return (
    <div>
      <div className='my-10 flex items-center justify-between'>
        <h2 className='text-3xl font-bold text-primary'>Hi {userDetail?.name}</h2>
        <p className='text-lg text-gray-600'>{userDetail?.credits} credits left</p>
      </div>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>Dashboard</h2>
        <Link href={'/create'}><Button>Generate New Logo</Button> </Link>
      </div>
    </div>
  )
}

export default Info
