'use client'
import { useState } from 'react'
import React from 'react'
import LogoTitle from './_components/LogoTitle'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import LogoDesc from './_components/LogoDesc'
import LogoPalette from './_components/LogoPalette'
import LogoDesign from './_components/LogoDesign'
import LogoIdea from './_components/LogoIdea'
import PricingModel from './_components/PricingModel'
import { Suspense } from 'react'

function CreateLogo() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState();
    const onHanldleInputChange = (field, value) => {
        setFormData(prev=>({ 
            ...prev,
            [field]: value
        }));
    }
  return (
    <div className='mt-30 p-10 border rounded-xl 2xl:mx-72'>
        {step==1? <LogoTitle onHanldleInputChange={(v) => onHanldleInputChange('title', v)} formData={formData} />:
        step==2? <LogoDesc onHanldleInputChange={(v)=>onHanldleInputChange('desc',v)} formData={formData}/>:
        step==3? <LogoPalette onHanldleInputChange={(v)=>onHanldleInputChange('palette',v)} formData={formData}/>:
        step==4? <LogoDesign onHanldleInputChange={(v)=>onHanldleInputChange('design',v)} formData={formData}/>:
        step==5? <LogoIdea onHanldleInputChange={(v)=>onHanldleInputChange('idea',v)} formData={formData}/>:
        step==6? <PricingModel onHanldleInputChange={(v)=>onHanldleInputChange('pricing',v)} formData={formData}/>:
        null
        } 
    
        <div className='flex items-center justify-between mt-10'>
            {step!=1&&<Button variant='outline' onClick={() => setStep(step - 1)}><ArrowLeft/> Previous</Button>}
            <Button onClick={() => setStep(step + 1)}><ArrowRight/> Next</Button>
        </div>
    </div>
  )
}

export default CreateLogo
