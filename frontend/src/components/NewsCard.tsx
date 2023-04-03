"use client";
import React from "react";


interface News{
	id: number,
	title: String,
	url: string,
  hotRank: number,
  content:String,
	dateOfIssue: String
}

const NewsCard = ({ news }: { news: News }) => {
  const url = news.url
  return (
    <div>
      <a href={url} target="_blank">
        <div className="ml-20 px-10 py-3 mr-20">
          <div className="border-b border-gray-400 bg-white rounded-b p-4 leading-normal overflow-hidden">
            <p className="text-sm text-gray-600 flex items-center">{news.dateOfIssue} </p>
            <div className="text-gray-900 font-bold text-xl mb-2">
              {news.title}
            </div>
            <p className="text-gray-700 text-base leading-relaxed w-7xl h-14 mb-3">
              {news.content}
            </p>
          </div>
        </div>
        </a>
    </div>
  );
};

export default NewsCard;
