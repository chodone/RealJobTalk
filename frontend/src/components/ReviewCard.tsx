"use client";
import React, { ReactElement, useState } from "react";
import ScrapModal from "./Modals/ScrapModal";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { authActions } from "@/redux/reducer/authReducer";
import { TiTickOutline,TiTick } from "react-icons/ti";


interface Data {
  totalpage: number,
  review: Array<Review>
}


interface Review {
  id: number,
  title: string,
  url: string,
  content: string,
  dateOfIssue: string,
  isScrap:boolean
}

const ReviewCard = ({ review}: { review: Review,  }): ReactElement => {
  const url = review.url
  const [isScrap, setIsScrap] = useState(review.isScrap)
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
            <p className="text-sm text-gray-600 flex items-center">{review.dateOfIssue.substring(0,4)}.{review.dateOfIssue.substring(4,6)}.{review.dateOfIssue.substring(6,8)}</p>
            <div className="text-gray-900 font-bold text-xl mb-2 justify-between flex">
              <div>{review.title}</div>
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
              {review.content}
            </p>
          </div>
        </div>
      </a>
      <ScrapModal
        open={open}
        setOpen={setOpen}
        logined={logined}
        setIsScrap={setIsScrap}
        review_id={review.id}
        isScrap={review.isScrap}
      />
    </div>
  );
};

export default ReviewCard;
