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
        pathname:`info/${companyName}/${enterpriseId}`,
      }}
    >
      <div className="justify-center flex flex-col items-center transform transition duration-500 hover:scale-110">
        <Image src={imgurl} alt="" width={238} height={87} style={{width :238,height:87}}/>
        <div>{companyName}</div>
      </div>
    </Link>
  );
};

export default Company;
