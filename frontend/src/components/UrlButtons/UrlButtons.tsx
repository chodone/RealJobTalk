'use client';

import Image from "next/image";


const UrlButtons = () => {

  


  return (
    <div className="grid grid-rows-4 row-span-3">
      <div className="grid md:grid-cols-4 gap-8 grid-cols-1">
        <div className="b mx-auto h-8 w-32 flex justify-center items-center">
          <div className="i h-8 w-32 bg-gradient-to-br from-green-400 to-green-600 items-center rounded-full shadow-2xl cursor-pointer absolute overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"></div>
          <a className="text-center text-white font-semibold z-10 pointer-events-none">
            Hover on me!
          </a>
        </div>
        

        <div />
      </div>
    </div>
  );
}

export default UrlButtons