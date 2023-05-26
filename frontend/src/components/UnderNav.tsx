"use client";

import React from "react";
import { useState,useEffect } from "react";
import Link from "next/link";
import { numactions } from "@/redux/reducer/numReducer";
import { useAppSelector, useAppDispatch } from "@/redux/hook";

interface params {
  company: string;
  enterpriseId: number;
}

const UnderNav = ({ params }: { params: params }) => {
  const company = decodeURI(params.company);
  const dispatch = useAppDispatch();

  

  const order = useAppSelector((state) => state.numbers.num);

  const nav_item = [
    {
      item: "기업정보",
      dir: "",
    },
    {
      item: "기업뉴스",
      dir: "/news",
    },
    {
      item: "합격후기",
      dir: "/reviews",
    },
  ];

 
  return (
    <div className="flex flex-row">
      <div className="flex space-x-10 px-40 mt-10 mb-2 basis-7/8">
        {nav_item.map((item, idx) => (
          <Link href={`/info/${company}/${params.enterpriseId}${item["dir"]}`} key={idx}>
            <div key={idx} className={order === idx ? "underline underline-offset-[12px] text-[#02E86E]" : ""} onClick={() => dispatch(numactions.SEARCH_BY_NAV({ idx }))}>
              {item["item"]}
              </div>
            </Link>
        ))}
      </div>
    </div>
  );
};

export default UnderNav;
