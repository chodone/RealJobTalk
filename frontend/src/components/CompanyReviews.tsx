'use client';

import React, { ReactElement, useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import api from "@/redux/api";

interface Review {
  id: number,
  title: string,
  url: string,
  dateOfIssue: string
}

// interface Reviews {
//   map(arg0: (review: any) => JSX.Element): React.ReactNode;
//   review: object
// }

interface Data {
  totalpage: number,
  review: Array<Review>
}


const ReviewList = ({reviews}:{reviews:Array<Review>}) => {

  return (
    <div className="grid grid-cols-2 gap-4 ml-4">
      {reviews.map((review:Review)=> {
        // console.debug(post.id);
        return (
          <ReviewCard
            key={review.id}
            review ={review}
          />
        );
      })}
    </div>
  )
};

const Reviews = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [results, setResults] = useState(Array<Review>);
  const [page, setPage] = useState(0);
  const size = 10;

  const pageCurSelect = "z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700   ";
  const pageNonSelect = "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700     ";



  useEffect(() => {
    api
      .get(`post/enterprise/{:enterprise_id}/pass_review?page=${page}&size=${size}`)
      .then(({ data }:{data:Data}) => {
        setTotalPages(data.totalpage);
        setResults([...data.review]);
      })
      .catch((error) => {
        console.debug(error);
      });

  }, [])

  const changePage = (num:number) => {
    api
      .get(`post/enterprise/{:enterprise_id}/pass_review?page=${num}&size=${size}`)
      .then(({ data }:{data:Data}) => {
        setPage(num);
        setResults([...data.review]);
      })
      .catch((error) => {
        console.debug(error);
      });
  }

  const getPreviousData = (num:number) => {
    if (num == -1) alert({ message: "첫 페이지입니다." });
    else changePage(num);
  }

  const getNextData = (num:number) => {
    if (num == totalPages) alert({ message: "마지막 페이지입니다." });
    else changePage(num);
  }
  const getPreviousTenData = () => {
    if (page - 10 < 0) changePage(0);
    else changePage(page - 10);
  }

  const getNextTenData = () => {
    if (page + 10 > totalPages - 1) changePage(totalPages - 1);
    else changePage(page + 10);
  }

  const Pagination = ({ curPage, totalPage }:{curPage:number, totalPage:number}): JSX.Element => {
    let start = Math.floor(((curPage % 10) == 9 ? curPage : (curPage + 1)) / 10) * 10;
    let tenend = Math.ceil(((curPage % 10) == 9 ? curPage : (curPage + 1)) / 10) * 10;
    let end = tenend > totalPage ? totalPage : tenend;
    let result = [];
    for (let i = start; i < end; i++) {
      result.push(
        <li key={i}>
          <div onClick={() => { changePage(i) }} className={curPage == i ? pageCurSelect : pageNonSelect}>{i + 1}</div>
        </li>
      )
    }
    return <>{result}</>;
  }


  return (
    <>
      <nav className="grid grid justify-center pb-3">
        <ul className="inline-flex items-center -space-x-px">
          <li>
            <div
              onClick={() => {
                getPreviousTenData();
              }}
              className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700     "
            >
              <span className="sr-only">Previous</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                />
              </svg>
            </div>
          </li>
          <li>
            <div
              onClick={() => {
                getPreviousData(page - 1);
              }}
              className="px-1 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700     "
            >
              <span className="sr-only">Previous</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </li>
          <Pagination curPage={page} totalPage={totalPages} />
          <li>
            <div
              onClick={() => {
                getNextData(page + 1);
              }}
              className="px-1 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700     "
            >
              <span className="sr-only">Previous</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </li>
          <li>
            <div
              onClick={() => {
                getNextTenData();
              }}
              className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700     "
            >
              <span className="sr-only">Next</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </li>
        </ul>
      </nav>
      <ReviewList reviews={results} />
    </>
  );

}

export default Reviews;