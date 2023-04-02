"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface dbObject {
  id:number
  name: string;
  imgUrl: string;
}

const Company = ({ company }: { company: dbObject }) => {
  const imgurl = company["imgUrl"];
  const companyName = company["name"];
  const enterpriseId = company['id']
  
  return (
    <Link
      className="transform h-64 w-64 transition duration-500 hover:scale-125"
      href={{
        pathname:`${companyName}`,
        query: { enterpriseId: enterpriseId },
      }}
    >
      <Image src={imgurl} alt="" width={200} height={200} />
      <div>{companyName}</div>
    </Link>
  );
};

export default Company;
