'use client';

import Image from "next/image";
import { TiSocialYoutube, TiHomeOutline, TiUserAddOutline, TiBook } from 'react-icons/ti'


const UrlButtons = () => {

  


  return (
    <div className="grid grid-rows-2 font-mono font-bold">
      <div className="grid ml-10 pb-3 md:grid-cols-4 grid-cols-1 row-start-2 row-end-2">
        <a
          id="youtube"
          className="bg-white cursor-pointer transform hover:-translate-y-3  border-2 w-16 h-16 rounded-full duration-500 text-green-500 border-green-500 hover:bg-green-500 hover:text-white text-2xl"
        >
          <i className="flex-col flex mt-3 fab fa-youtube justify-center items-center">
            <TiHomeOutline />
            <p className=" mb-3 text-xs text-slate-900 text">HOME</p>
          </i>
        </a>
        <a
          id="youtube"
          className="bg-white cursor-pointer transform hover:-translate-y-3  border-2 w-16 h-16 rounded-full duration-500 text-green-500 border-green-500 hover:bg-green-500 hover:text-white text-2xl"
        >
          <i className="flex-col flex mt-3 fab fa-youtube justify-center items-center">
            <TiUserAddOutline />
            <p className=" mb-3 text-xs text-slate-900 text">RECRUIT</p>
          </i>
        </a>
        <a
          id="youtube"
          className="bg-white cursor-pointer transform hover:-translate-y-3  border-2 w-16 h-16 rounded-full duration-500 text-green-500 border-green-500 hover:bg-green-500 hover:text-white text-2xl"
        >
          <i className="flex-col flex mt-3 fab fa-youtube justify-center items-center">
            <TiBook />
            <p className=" mb-3 text-xs text-slate-900 text">BLOG</p>
          </i>
        </a>
        <a
          id="youtube"
          className="bg-white cursor-pointer transform hover:-translate-y-3  border-2 w-16 h-16 rounded-full duration-500 text-red-500 border-red-500 hover:bg-red-500 hover:text-white text-2xl"
        >
          <i className="flex-col flex mt-3 fab fa-youtube justify-center items-center">
            <TiSocialYoutube />
            <p className=" mb-3 text-xs text-slate-900 text">YOUTUBE</p>
          </i>
        </a>

        <div />
      </div>
    </div>
  );
}

export default UrlButtons