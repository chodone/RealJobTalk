"use client";
import { useAppSelector } from "@/redux/hook";
import React, { useState } from "react";
import ScrapModal from "./Modals/NewsScrapModal";
import { TiTickOutline, TiTick } from "react-icons/ti";

interface HOT {
  id: number;
  title: String;
  url: string;
  count: number;
  isScrap: boolean;
}

const HotRankCard = ({ news }: { news: HOT }) => {
  const url = news.url;
  
  const [isScrap, setIsScrap] = useState(news.isScrap);
  const [open, setOpen] = useState(false);

  const getAuth = useAppSelector((state) => state.auth);
  const logined = getAuth.isLogined;

  const toggleModal_ = (): void => {
    setOpen((prev) => !prev);
  };
  return (
    <div>
      <a href={url} target="_blank">
        <div className=" flex justify-between mb-2">
          {news.title}
          {!isScrap && (
            <button
              className="h-6 w-40 border-2 border-emerald-500 items-center rounded-full shadow-2xl cursor-pointer  overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
              onClick={(e) => {
                e.preventDefault();
                toggleModal_();
              }}
            >
              <p className="text-sm">scrap</p>
            </button>
          )}
          {isScrap && (
            <button
              className="h-6 w-40 bg-gradient-to-br flex justify-center from-green-400 to-green-600 items-center rounded-full shadow-2xl cursor-pointer  overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
              onClick={(e) => {
                e.preventDefault();
                toggleModal_();
              }}
            >
              <p className="text-sm bold">scrapping</p>
              <TiTick />
            </button>
          )}
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

export default HotRankCard;
