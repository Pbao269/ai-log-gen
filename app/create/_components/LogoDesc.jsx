import Lookup from '@/app/_data/Lookup'
import HeadingDescription from './HeadingDescription'
import React from 'react'

function LogoDesc({onHanldleInputChange, formData}) {
  return (
    <div className='my-10'>
      <HeadingDescription title={Lookup.LogoDescTitle} description={Lookup.LogoDescDesc}/>

        <input type='text' placeholder="Describe the vision/inspiration of your company" 
            className='p-4 border border-border rounded-md w-full shadow-md focus:ring-2 focus:ring-primary focus:outline-none mt-5'
            defaultValue={formData?.desc}
            onChange={(e) => onHanldleInputChange(e.target.value)}/>
    
    </div>
  )
}

export default LogoDesc
