import React from 'react'

function HeadingDescription({title, description}) {
  return (
    <div>
        <h2 className=' text-primary text-4xl font-bold'>{title}</h2>
        <p className='text-lg text-gray-600'>{description}</p>
    </div>
  )
}

export default HeadingDescription
