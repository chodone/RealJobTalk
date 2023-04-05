"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@public/images/logo.png";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authActions } from "@/redux/reducer/authReducer";
import jwtDecode from "jwt-decode";
import { newactions } from "@/redux/reducer/reducer";


import { HiMagnifyingGlass, HiOutlineXMark } from "react-icons/hi2";


type Props = {
  params: {
    company: string;
  };
};

const Navbar = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;
  const MainLogo = logo;
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(authActions.checkAccessToken());
  }, []);

  let [keyword, setkeyword] = useState("");

  const SearchBycompany = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(newactions.SEARCH_BY_NAME({ keyword }));
    router.push(`/${keyword}`)
  };



  const getAuth = useAppSelector((state) => state.auth);
  const nickname = getAuth.nickname;
  const logined = getAuth.isLogined;

  return (
    <nav>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <div>
              <Link className="flex items-center py-5 px-2" href="/" >
                <Image className="h-6 w-24" src={MainLogo} alt="" />
              </Link>
            </div>

            {/* primary nav */}
            <form onSubmit={SearchBycompany}>
              <div className="flex items-center space-x-3 mt-2">
                <div className="flex border-2 border-gray-200 rounded">
                  <input
                    type="text"
                    className="px-4 py-2 w-80"
                    placeholder="기업을 검색해보세요"
                    onChange={(event) => setkeyword(event.target.value)}
                  />
                  <button type="submit">
                    <HiMagnifyingGlass className="w-6 h-6 my-2 mx-1 border-gray-200" />
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* mobile nav */}
          {logined && (
            <div className="flex items-center space-x-1">
              <button
                type="button"
                className="py-5 px-3"
                onClick={() => {
                  dispatch(authActions.logOut());
                  location.reload()
                }}
              >
                로그아웃
              </button>
              <button
                type="button"
                className="py-5 px-3"
                onClick={() => router.push(`mypage/${nickname}`)}
              >
                마이페이지
              </button>
            </div>
          )}
          {!logined && (
            <div className="flex items-center space-x-1">
              <button
                type="button"
                className="py-5 px-3"
                onClick={() => router.push("/signin")}
              >
                로그인
              </button>
              <button
                type="button"
                className="py-5 px-3"
                onClick={() => router.push("/signup")}
              >
                회원가입
              </button>
            </div>
          )}

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
      <hr />
    </nav>
  );
};

export default Navbar;
