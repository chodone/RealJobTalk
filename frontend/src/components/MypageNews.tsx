"use client";

import React, { ReactElement, useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import api from "@/redux/api";
import HotRank from "@/components/NewsHotRank";

interface News {
  id: number;
  title: String;
  url: string;
  hotRank: number;
  content: String;
  dateOfIssue: String;
  isScrap: boolean;
}

// interface Reviews {
//   map(arg0: (review: any) => JSX.Element): React.ReactNode;
//   review: object
// }

interface Data {
  totalPages: number;
  newsResponseList: Array<News>;
}

const NewsList = ({ news, curPage }: { news: Array<News>; curPage: number }) => {
  return (
    <div className="grid ml-4" style={{ height: 900 }}>
      {news.map((news: News) => {
        // console.debug(post.id);
        return <NewsCard key={news.id} news={news} />;
      })}
    </div>
  );
};

const MypageNews = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [results, setResults] = useState(Array<News>);
  const [page, setPage] = useState(0);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const size = 4;

  const pageCurSelect =
    "z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700";
  const pageNonSelect =
    "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700";

  useEffect(() => {
    api
      .get(`/api/member/scrap/news?size=${size}&page=${page}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(({ data }: { data: Data }) => {
        console.log(data);
        setTotalPages(data.totalPages);
        setResults([...data.newsResponseList]);
      })
      .catch((error) => {
        console.debug(error);
      });
  }, []);

  const changePage = (num: number) => {
    api
      .get(`/api/member/scrap/news?size=${size}&page=${num}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(({ data }: { data: Data }) => {
        setPage(num);
        console.log(data);
        setResults([...data.newsResponseList]);
      })
      .catch((error) => {
        console.debug(error);
      });
  };

  const getPreviousData = (num: number) => {
    if (num == -1) alert("첫 페이지입니다.");
    else changePage(num);
  };

  const getNextData = (num: number) => {
    if (num == totalPages) alert("마지막 페이지입니다.");
    else changePage(num);
  };
  const getPreviousTenData = () => {
    if (page - 10 < 0) changePage(0);
    else changePage(page - 10);
  };

  const getNextTenData = () => {
    if (page + 10 > totalPages - 1) changePage(totalPages - 1);
    else changePage(page + 10);
  };

  const Pagination = ({
    curPage,
    totalPage,
  }: {
    curPage: number;
    totalPage: number;
  }): JSX.Element => {
    let start = Math.floor((curPage % 10 == 9 ? curPage : curPage + 1) / 10) * 10;
    let tenend = Math.ceil((curPage % 10 == 9 ? curPage : curPage + 1) / 10) * 10;
    let end = tenend > totalPage ? totalPage : tenend;
    let result = [];
    for (let i = start; i < end; i++) {
      result.push(
        <li key={i}>
          <div
            onClick={() => {
              changePage(i);
            }}
            className={curPage == i ? pageCurSelect : pageNonSelect}
          >
            {i + 1}
          </div>
        </li>
      );
    }
    return <>{result}</>;
  };

  return (
    <div className="animate-fade-up">
      <NewsList news={results} curPage={page} />
      <nav className="grid grid justify-center mb-3">
        <ul className="inline-flex items-center -space-x-px cursor-pointer ...">
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
    </div>
  );
};

export default MypageNews;
