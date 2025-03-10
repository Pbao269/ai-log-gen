'use client'
import React, { useState } from 'react'
import { useContext } from 'react'
import { UserDetailContext } from '@/app/_context/UserDetailContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/configs/FirebaseConfig';
import { useEffect } from 'react';
import Image from 'next/image';

function LogoList() {
  const {userDetail, setUserDetail} = useContext(UserDetailContext);
  const [logoList, setLogoList] = useState([]);
  useEffect(() => {
    userDetail&&GetUserLogos();
  }, [userDetail]);
  const GetUserLogos = async() => {
    const querySnapshot = await getDocs(collection(db, "users", userDetail?.email, "logos"));
    setLogoList([]);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setLogoList(prev => [...prev, doc.data()])
    })
  }
  return (
    <div className="my-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {logoList?.length > 0 ? (
          logoList.map((logo, index) => (
            <div key={index}>
              <Image
                src={logo?.image}
                alt={logo.title}
                width={300}
                height={300}
                className="rounded-lg w-full"
              />
              <h2 className=" text-center text-lg font-semibold mt-2">{logo?.title}</h2>
            </div>
          ))
        ) : (
          <>
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="h-[300px] w-full bg-muted rounded-lg animate-pulse"
              />
            ))}
            <div className="col-span-full text-center text-muted-foreground mt-4">
              <p>You haven’t generated any logos yet.</p>
              <p className="text-sm">Generate a new logo to get started ✨</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
  
}

export default LogoList
