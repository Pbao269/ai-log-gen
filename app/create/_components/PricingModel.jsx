'use client'
import Lookup from '@/app/_data/Lookup'
import React, { useEffect } from 'react'
import HeadingDescription from './HeadingDescription'
import { SignInButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function PricingModel({ formData }) {
    const { user } = useUser();

    useEffect(() => {
        if (formData?.title && typeof window !== 'undefined') {
            localStorage.setItem('formData', JSON.stringify(formData));
        }
    }, [formData]);

    return (
        <div className="my-10">
            <HeadingDescription
                title={Lookup.LogoPricingModelTitle}
                description={Lookup.LogoPricingModelDesc}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                {Lookup.pricingOption.map((pricing, index) => (
                    <div
                        key={index}
                        className="border p-6 rounded-lg shadow-md flex flex-col items-center text-center h-full"
                    >
                        <h3 className="text-xl font-bold">{pricing.title}</h3>

                        <ul className="mt-3 space-y-2 text-gray-600 text-left mx-auto list-disc list-inside">
                            {pricing.features.map((feature, i) => (
                                <li key={i} className="text-sm">{feature}</li>
                            ))}
                        </ul>

                        <div className="flex-grow"></div>

                        {user ? (
                            <Link href={`/generate-logo?type=${pricing.title}`}>
                                <Button className="mt-4">{pricing.button}</Button>
                            </Link>
                        ) : (
                            <SignInButton mode="modal" forceRedirectUrl={`/generate-logo?type=${pricing.title}`}>
                                <Button className="mt-4">{pricing.button}</Button>
                            </SignInButton>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PricingModel;
