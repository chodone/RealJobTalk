'use client'

import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

export interface dbObject {
  company: string;
  url: string;
}



const Company = ({ company }: { company: dbObject }) => {
  const imgurl = company.url
  const companyName = company.company
  return (
    <Link href={`${companyName}/info`}>
      <Image  src={imgurl} alt=""  width={200} height={200}/>
      <div>{companyName}</div>
    </Link>
  )
}

export default Company
