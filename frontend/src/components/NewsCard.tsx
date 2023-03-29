"use client";
import React from "react";

const NewsCard = () => {
  return (
    <div>
      <div>
        <div className="ml-20 px-10 py-3 mr-20">
          <div className="border-b border-gray-400 bg-white rounded-b p-4 leading-normal overflow-hidden">
            <p className="text-sm text-gray-600 flex items-center">이데일리 </p>
            <p className="text-sm text-gray-600 flex items-center">2023.03.15 </p>
            <div className="text-gray-900 font-bold text-xl mb-2">
              멀티캠퍼스, 박성태 정석목 대표이사 체제로 변경
            </div>
            <p className="text-gray-700 text-base leading-relaxed w-7xl h-14 mb-3">
              멀티캠퍼스는 기존 박성태에서 정석옥 대표이사 체제로 변경된다고 15일 공시했다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
