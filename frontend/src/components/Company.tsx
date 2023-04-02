"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export interface dbObject {
  name: string;
  imgUrl: string;
}

const Company = ({ company }: { company: dbObject }) => {
  const imgurl = company["imgUrl"];
  const companyName = company["name"];
  
  return (
    <Link 
      href={`info/${companyName}`}
    >
      <div className="justify-center flex flex-col items-center transform transition duration-500 hover:scale-110">
        <Image src={imgurl} alt="" width={238} height={87} style={{width :238,height:87}}/>
        <div>{companyName}</div>
      </div>
    </Link>
  );
};

export default Company;
