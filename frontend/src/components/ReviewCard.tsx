"use client";
import React, { ReactElement, useState } from "react";
import ScrapModal from "./Modals/ScrapModal";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { authActions } from "@/redux/reducer/authReducer";


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
  console.log(logined)

  const toggleModal_ = (): void => {
    setOpen((prev) => !prev);
  };

  return (
    <div>
      <a href={url} target="_blank">
        <div className="ml-20 px-10 py-3 mr-20">
          <div className="border-b border-gray-400 bg-white rounded-b p-4 leading-normal overflow-hidden">
            <p className="text-sm text-gray-600 flex items-center">{review.dateOfIssue}</p>
            <div className="text-gray-900 font-bold text-xl mb-2 justify-between flex">
              <div>{review.title}</div>
              {!isScrap && <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleModal_();
                  
                }}
              >
                scrab
              </button>}
              {isScrap && <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleModal_();
                }}
              >
                UnScrab
              </button>}
            </div>
            <p className="text-gray-700 text-base leading-relaxed w-7xl h-14 mb-3">
              {review.content}
            </p>
          </div>
        </div>
      </a>
      <ScrapModal open={open} setOpen={setOpen} logined={logined} setIsScrap={setIsScrap} review_id={review.id} />
    </div>
  );
};

export default ReviewCard;
