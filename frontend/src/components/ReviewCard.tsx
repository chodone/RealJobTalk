"use client";
import React from "react";



interface Data {
  totalpage: number,
  review: Array<Review>
}


interface Review {
  id: number,
  title: string,
  url: string,
  content: string,
  dateOfIssue: string
}

const ReviewCard = ({ review }: { review: Review }) => {
  const url = review.url
  return (
    <div>
      <a href={url} target="_blank">
      <div className="ml-20 px-10 py-3 mr-20">
        <div className="border-b border-gray-400 bg-white rounded-b p-4 leading-normal overflow-hidden">
          <p className="text-sm text-gray-600 flex items-center">{ review.dateOfIssue}</p>
          <div className="text-gray-900 font-bold text-xl mb-2">
            {review.title}
          </div>
          <p className="text-gray-700 text-base leading-relaxed w-7xl h-14 mb-3">
            {review.content}
 
          </p>
        </div>
        </div>
        </a>
    </div>
  );
};

export default ReviewCard;
