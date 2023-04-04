"use client"
import React from 'react'
import { useState } from "react";
import Link from "next/link";

const MypageSideBox = () => {

  const nav_item = [
    {
      item: "스크랩 기사",
      dir: "/scrap_article",
    },
    {
      item: "스크랩 합격후기",
      dir: "/scrap_accept",
    },
  ];
  const [active, setactive] = useState(0);

  const handleClick = (num: number) => {
    setactive(num);
  };

  return (
    <div>
      
    </div>
  )
}

export default MypageSideBox
