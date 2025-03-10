'use client'
import React from 'react'
import Lookup from '../_data/Lookup'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import Link from 'next/link'

function Hero() {
    const [logoTitle, setLogoTitle]=useState();
  return (
    <div className='flex items-center mt-30 flex-col gap-5'>
      <h2 className=' text-primary text-4xl font-bold text-center'>{Lookup.HeroHeading}</h2>
      <h3 className='text-2xl font-semibold text-center'>{Lookup.HeroSubheading}</h3>
      <p className='text-lg text-gray-600 text-center'>{Lookup.HeroDescription}</p>
      <div className="flex w-full max-w-2xl">
        <input 
            type="text"
            placeholder= {Lookup.InputTitlePlaceholder}
            className="p-4 border border-border rounded-md w-full shadow-md focus:ring-2 focus:ring-primary focus:outline-none"
            onChange={(e) => setLogoTitle(e.target.value)}
        />
        <Link href={`/create?title=${logoTitle}`}>
        <Button className="px-6 py-4 ml-4 h-[57px]">
            Go
        </Button>
        </Link>
        </div>
    </div>
  )
}

export default Hero
