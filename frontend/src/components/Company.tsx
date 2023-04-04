"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { numactions } from "@/redux/reducer/numReducer";
import { useAppDispatch } from "@/redux/hook";

export interface dbObject {
  id:number
  name: string;
  imgUrl: string;
}

const Company = ({ company }: { company: dbObject }) => {
  const imgurl = company["imgUrl"];
  const companyName = company["name"];
  const enterpriseId = company['id']
  const dispatch = useAppDispatch();

  
  return (
    <Link
      className="transform h-64 w-64 transition duration-500 hover:scale-125"
      href={{
        pathname:`info/${companyName}/${enterpriseId}`,
      }}
    >
      <div className=" m-4 border-2 rounded-lg justify-center flex flex-col items-center transform transition duration-500 hover:scale-110"
        onClick={() => dispatch(numactions.RESET_NUM())}>
        <Image src={imgurl} alt="" width={238} height={87} style={{width :238,height:87}}/>
        <div>{companyName}</div>

      </div>
    </Link>
  );
};

export default Company;
