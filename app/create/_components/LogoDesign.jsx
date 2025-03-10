'use client'
import React, { useState } from 'react'
import HeadingDescription from './HeadingDescription'
import Image from 'next/image'
import Lookup from '@/app/_data/Lookup'
import LogoDes from '@/app/_data/LogoDes'

function LogoDesign({ onHanldleInputChange, formData }) {
  const [selectedOption, setSelectedOption] = useState(formData?.design?.title);

  return (
    <div className="my-10">
      <HeadingDescription title={Lookup.LogoDesignTitle} description={Lookup.LogoDesignDesc} />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-5">
        {LogoDes.map((design, index) => (
          <div 
            key={index}
            onClick={() => {
              setSelectedOption(design.title);
              onHanldleInputChange(design);
            }}
            className={`flex flex-col items-center p-2 cursor-pointer rounded-lg ${
              selectedOption === design.title ? 'border-2 border-primary' : 'border'
            }`}
          >

            <Image src={design.image} alt={design.title} width={300} height={300} className="rounded-lg" />
            
            <p className="mt-2 text-center text-sm font-medium whitespace-normal">
              {design.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoDesign;
