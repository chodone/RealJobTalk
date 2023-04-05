"use client"
import React, { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo2 from "@public/images/logo2.png"
import { MdRateReview } from "react-icons/md";
import { FcNews, FcGraduationCap } from "react-icons/fc";

import MypageReviews from "./MypageReviews";
import MypageNews from "./MypageNews";
import api from "@/redux/api";

interface USER {
  email: string
  nickname: string
  scrapNewsCount: number
  scrapPassReviewCount:number
}

const Mypage = () => {

  const [scrap, setScrap] = useState('news')
  const [user, setUser] = useState(Object)

  useEffect(() => {
    api
      .get("/api/member/scrap/count", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setUser(res.data)
      })
      .catch((err) => {
        console.debug(err);
      });
  }, [])

  return (
    <div className="p-16">
      <div className="p-8 bg-white shadow mt-16">
        <div className="flex ">
          <Image src={logo2} width={81} height={89} alt="" />
          <h1 className="title-font mt-3 sm:text-3xl md:text-6xl xl:text-6xl font-bold ">
            취준진담
          </h1>
        </div>
        <div className="mt-5 ml-5  border-b pb-12">
          <h1 className="text-4xl mb-10 font-medium text-gray-700">
            {user.nickname}
            <p className=" text-lg text-gray-400">{user.email}</p>
          </h1>
          <div className="grid grid-cols-2 text-center order-last md:order-first mt-20 md:mt-0">
            <div className=" items-center flex flex-col">
              <div>
                <p className="font-bold text-gray-700 text-xl">{user.scrapNewsCount}</p>
                <FcNews color="green" className="w-10 h-10 " />
              </div>
              <button onClick={() => { setScrap('news')}} className="text-white py-2 px-4 mt-5 uppercase rounded bg-green-400 hover:bg-green-700 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                NEWS
              </button>
            </div>
            <div className=" items-center flex flex-col">
              <div>
                <p className="font-bold text-gray-700 text-xl">{user.scrapPassReviewCount}</p>
                <FcGraduationCap className="w-10 h-10" />
              </div>
              <button onClick={() => { setScrap('review')}} className="text-white py-2 px-4 mt-5 uppercase rounded bg-gray-400 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                REVIEW
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-center">
          {(scrap === 'review') && <MypageReviews />}
          {(scrap === 'news') && <MypageNews />}
          
          <button className="text-indigo-500 py-2 px-4  font-medium mt-4"> Show more</button>{" "}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
