'use client'
import React, { useState, useContext, useEffect } from 'react'
import { UserDetailContext } from '../_context/UserDetailContext';
import Prompt from '../_data/Prompt';
import axios from 'axios';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Loader2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';
function GenerateLogo() {
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const [formData, setFormData] = useState();
    const [loading, setLoading] = useState(false);
    const [logoImage, setLogoImage] = useState();
    const searchParams = useSearchParams();
    const modelType = searchParams.get('type');

    useEffect(() => {
        if (typeof window !== 'undefined' && userDetail?.email) {
        const storage = localStorage.getItem('formData');
        if (storage) {
            setFormData(JSON.parse(storage));
        }
        }
    }, [userDetail]);
    useEffect(() => {
        if (formData?.title) {
            GenerateAILogo();
        }
    }, [formData]);
    useEffect(() => {
        if (typeof window !== 'undefined' && logoImage) {
            localStorage.clear();
    }}, [logoImage]);

    const GenerateAILogo = async() => {

        if (modelType != 'Free' && userDetail?.credits<=0) {
            alert('You have no credits to generate logo');
            toast('You have no credits to generate logo');
            return;
        }

        setLoading(true);
        const PROMPT = Prompt.LOGO_PROMPT
          .replace('{logoTitle}', formData?.title)
          .replace('{logoDesc}', formData?.desc)
          .replace('{logoColor}', formData?.palette)
          .replace('{logoDesign}', formData?.design?.title)
          .replace('{logoPrompt}', formData?.design?.prompt)
          .replace('{logoIdea}', formData?.idea);
      
        // console.log(PROMPT);

        const result = await axios.post('/api/ai-logo-model', { 
            prompt: PROMPT,
            email:userDetail?.email,
            title:formData?.title,
            desc:formData?.desc,
            type:modelType,
            userCredit:userDetail?.credits
        });
        setLoading(false);
        setLogoImage(result.data?.image);
      };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold text-primary mb-6">
        {loading ? 'Your logo is being created' : 'Your logo is ready!'}
      </h2>

      {loading ? (
        <Loader2Icon className="animate-spin h-12 w-12 text-primary" />
      ) : (
        <>
          {logoImage && (
            <Image
              src={logoImage}
              alt="Generated Logo"
              width={300}
              height={300}
              className="rounded-lg shadow-md mb-6"
            />
          )}
          <div className="flex gap-4">
            <Button
              variant="default"
              onClick={() => {
                const link = document.createElement('a');
                link.href = logoImage;
                link.download = 'logo.png';
                link.click();
              }}
            >
              Download
            </Button>
            <Button variant="outline">
                <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default GenerateLogo
