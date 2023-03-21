import React from 'react'
import Image from 'next/image';

export interface dbObject {
  company: string;
  url: string;
}

const Company = ({ company }: { company: dbObject }) => {
  const imgurl = company.url
  return (
    <div>
      <Image src={imgurl} alt=""  width={200} height={200} />
      <div>{company.company}</div>
    </div>
  )
}

export default Company
