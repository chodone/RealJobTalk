"use client"
import React, { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo2 from "@public/images/logo2.png"
import { MdRateReview } from "react-icons/md";
import { FcNews, FcGraduationCap } from "react-icons/fc";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import MypageReviews from "./MypageReviews";
import MypageNews from "./MypageNews";
import RecommendCompany from "./RecommendCompany/RecommendCompany";
import api from "@/redux/api";

export interface userObjcet {
  email: string
  nickname: string
  scrapNewsCount: number
  scrapPassReviewCount: number
}

export interface dbObject {
  id:number
  name: string;
  imgUrl: string;
}




const Mypage = () => {

  const [scrap, setScrap] = useState('news')
  const [user, setUser] = useState(Object)
  const [companyBtn, setCompanyBtn] = useState(true)
  const [load, setLoad] = useState(true)
  const getAuth = useAppSelector((state) => state.auth);
  
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
        setLoad(false)
        
      })
      .catch((err) => {
        console.debug(err);
      });
  }, [])

  const recommendCompany:Array<dbObject> = user.recommendEnterpriseResponses
  
  return (
    <div className="animate-fade-up p-16">
      <div className="p-8 bg-white shadow mt-16">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <Image src={logo2} width={81} height={89} alt="" />
            <h1 className="title-font mt-3 sm:text-3xl md:text-6xl xl:text-6xl font-bold ">
              취준진담
            </h1>
          </div>
          <div>
            {companyBtn && !load && (
              <button
                onClick={() => {
                  setCompanyBtn(false);
                }}
                className="animate-fade-up text-white py-2 px-8 mt-5 mr-12 uppercase text-xl rounded bg-green-400 hover:bg-green-700 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              >
                추천기업
              </button>
            )}
            {load && (
              <div className="flex justify-center items-center space-x-1 text-sm text-gray-700">
                <svg
                  fill="none"
                  className="w-20 h-20 border-emerald-700 animate-spin"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                    fill="currentColor"
                    fill-rule="evenodd"
                  />
                </svg>

                <div className=" text-3xl"> 추천기업 분석중 ...</div>
              </div>
            )}
            {!companyBtn && <RecommendCompany recommendCompany={recommendCompany} />}
          </div>
        </div>
        <div className="mt-5 ml-5  border-b pb-12">
          <h1 className="text-4xl mb-10 font-medium text-gray-700">
            {getAuth.nickname}
            <p className=" text-lg text-gray-400">{getAuth.email}</p>
          </h1>
          <div className="grid grid-cols-2 text-center order-last md:order-first mt-20 md:mt-0">
            <div className=" items-center flex flex-col">
              <div>
                <p className="font-bold text-gray-700 text-xl">{user.scrapNewsCount}</p>
                <FcNews color="green" className="w-10 h-10 " />
              </div>
              <button
                onClick={() => {
                  setScrap("news");
                }}
                className="text-white py-2 px-4 mt-5 uppercase rounded bg-green-400 hover:bg-green-700 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              >
                NEWS
              </button>
            </div>
            <div className=" items-center flex flex-col">
              <div>
                <p className="font-bold text-gray-700 text-xl">{user.scrapPassReviewCount}</p>
                <FcGraduationCap className="w-10 h-10" />
              </div>
              <button
                onClick={() => {
                  setScrap("review");
                }}
                className="text-white py-2 px-4 mt-5 uppercase rounded bg-gray-400 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
              >
                REVIEW
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-center">
          {scrap === "review" && <MypageReviews />}
          {scrap === "news" && <MypageNews />}
          <button className="text-indigo-500 py-2 px-4  font-medium mt-4"> Show more</button>{" "}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
