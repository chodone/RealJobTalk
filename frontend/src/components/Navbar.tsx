'use client';

import Image from "next/image";
import React, { useState } from "react";
import logo from "@public/images/logo.png"


import {
  HiMagnifyingGlass,
  HiOutlineXMark

} from "react-icons/hi2";
// import {useRouter} from "next/router";

const Navbar = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  // const router = useRouter();
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;
  const MainLogo = logo

  return (
    //   navbar goes here
    <nav>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <div>
              <a href="/" className="flex items-center py-5 px-2">
                <Image className="h-6 w-24" src={MainLogo} alt="" />
              </a>
            </div>

            {/* primary nav */}
            <div className="flex items-center space-x-3">
              <div className="flex border-2 border-gray-200 rounded">
                <input
                  type="text"
                  className="px-4 py-2 w-80"
                  placeholder="기업을 검색해보세요"
                />
                <HiMagnifyingGlass className="w-6 h-6 my-2 mx-1 border-gray-200" />
              </div>
              <div className="w20">
                <select data-te-select-init>
                  <option value="1">삼성전자</option>
                  <option value="2">multicampus</option>
                  <option value="3">당근서비스</option>
                  <option value="4">NAVER Cloud</option>
                  <option value="5">NAVER WEBTOON</option>
                  <option value="6">Coupang</option>
                  <option value="7">KAKAO</option>
                  <option value="8">LG전자</option>
                </select>
              </div>
            </div>
          </div>

          {/* mobile nav */}
          <div className="flex items-center space-x-1">
            <a href={KAKAO_AUTH_URI}>
              <button
                type="button"
                className="py-5 px-3"
              // onClick={() => router.push('/signin')}
              >
                로그인
              </button>
            </a>
            <button
              type="button"
              className="py-5 px-3"
            // onClick={() => router.push('/signup')}
            >
              회원가입
            </button>
          </div>

          {/* mobile menu */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuToggle(!menuToggle)}>
              {menuToggle ? (
                <HiOutlineXMark className="w-6 h-6" />
              ) : (
                <HiMagnifyingGlass className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* mobile menu items */}
      <div className={`${!menuToggle ? "hidden" : ""} md:hidden`}>
        <a
          href="/features"
          className="block py-2 px-4 text-sm hover:bg-gray-200"
        >
          Features
        </a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
          Pricing
        </a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
          Login
        </a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
          Signup
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
