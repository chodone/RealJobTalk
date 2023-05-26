"use client";
import { useAppSelector } from "@/redux/hook";
import React, { useState } from "react";
import ScrapModal from "./Modals/NewsScrapModal";
import { TiTickOutline,TiTick } from "react-icons/ti";


interface News{
	id: number,
	title: String,
	url: string,
  hotRank: number,
  content:String,
  dateOfIssue: String,
  isScrap:boolean
}

const NewsCard = ({ news, }: { news: News }) => {
  const url = news.url
  
  const [isScrap, setIsScrap] = useState(news.isScrap)
  const [open, setOpen] = useState(false);

  const getAuth = useAppSelector((state) => state.auth);
  const logined = getAuth.isLogined;

  const toggleModal_ = (): void => {
    setOpen((prev) => !prev);
  };
  return (
    <div>
      <a href={url} target="_blank">
        <div className="ml-20 px-10 py-3 mr-20">
          <div className="border-b border-gray-400 bg-white rounded-b p-4 leading-normal overflow-hidden">
            <p className="text-sm text-gray-600 flex items-center">{news.dateOfIssue.substring(0,4)}.{news.dateOfIssue.substring(4,6)}.{news.dateOfIssue.substring(6,8)} </p>
            
            <div className="text-gray-900 font-bold text-xl mb-2 justify-between flex">
              {news.title}
              {!isScrap && (
                <button
                  className="h-8 w-32 border-2 border-emerald-500 items-center rounded-full shadow-2xl cursor-pointer  overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleModal_();
                  }}
                >
                  <p className="text-sm">
                    scrap

                  </p>
                </button>
              )}
              {isScrap && (
                <button
                  className=" h-8 w-32 bg-gradient-to-br flex justify-center from-green-400 to-green-600 items-center rounded-full shadow-2xl cursor-pointer  overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleModal_();
                  }}
                >
                  <p className="text-sm">scrapping</p>
                  <TiTick/>
                </button>
              )}
            </div>
            <p className="text-gray-700 text-base leading-relaxed w-7xl h-14 mb-3">
              {news.content}
            </p>
          </div>
        </div>
      </a>
      <ScrapModal
        open={open}
        setOpen={setOpen}
        logined={logined}
        setIsScrap={setIsScrap}
        news_id={news.id}
        isScrap={news.isScrap}
      />
    </div>
  );
};

export default NewsCard;
