"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";

interface params {
  company: string;
  enterpriseId: number;
}

const UnderNav = ({ params }: { params: params }) => {
  const company = decodeURI(params.company);

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
  const [active, setactive] = useState(0);

  const handleClick = (num: number) => {
    setactive(num);
  };
 
  return (
    <div className="flex flex-row">
      <div className="flex space-x-10 px-40 mt-10 mb-2 basis-7/8">
        {nav_item.map((item, idx) => (
          <Link href={`/info/${company}/${params.enterpriseId}${item["dir"]}`} key={idx}>
            <div key={idx} className={active === idx ? "underline underline-offset-[12px] text-[#02E86E]" : ""} onClick={() => handleClick(idx)}>
              {item["item"]}
              </div>
            </Link>
        ))}
      </div>
    </div>
  );
};

export default UnderNav;
