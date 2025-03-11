'use client'
import React, { useState, useEffect } from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'

function LogoTitle({ onHanldleInputChange }) {
  const [title, setTitle] = useState('')

  const handleChange = (e) => {
    setTitle(e.target.value)
    onHanldleInputChange(e.target.value)
  }

  return (
    <div className='my-10'>
      <HeadingDescription
        title={Lookup.LogoTitle}
        description={Lookup.LogoTitleDesc}
      />

      <input
        type='text'
        placeholder={Lookup.InputTitlePlaceholder}
        className='p-4 border border-border rounded-md w-full shadow-md focus:ring-2 focus:ring-primary focus:outline-none mt-5'
        value={title}
        onChange={handleChange}
      />
    </div>
  )
}

export default LogoTitle
