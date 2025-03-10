
'use client'
import React, { useState } from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'
import { useSearchParams } from 'next/navigation'

function LogoTitle({onHanldleInputChange}) {
    const searchParam = useSearchParams();
    const [title,setTitle] = useState(searchParam.get('title')??'');
  return (
    <div className='my-10'>
        <HeadingDescription title={Lookup.LogoTitle} description={Lookup.LogoTitleDesc}/>

        <input type='text' placeholder={Lookup.InputTitlePlaceholder} 
        className='p-4 border border-border rounded-md w-full shadow-md focus:ring-2 focus:ring-primary focus:outline-none mt-5'
        defaultValue={title} 
        onChange={(e) => onHanldleInputChange(e.target.value)}/>

    </div>
  )
}

export default LogoTitle
