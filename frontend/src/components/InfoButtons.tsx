'use client';

import Image from "next/image";
import { TiSocialYoutube, TiHomeOutline, TiUserAddOutline, TiBook } from 'react-icons/ti'


const InfoButtons = () => {

  


  return (
    <div>
      <label
        htmlFor="Toggle3"
        className="inline-flex items-center p-2 rounded-md cursor-pointer dark:text-gray-800"
      >
        <input id="Toggle3" type="checkbox" className="hidden peer" />
        <span className="px-4 py-2 rounded-l-md dark:bg-violet-400 peer-checked:dark:bg-gray-300">
          Monthly
        </span>
        <span className="px-4 py-2 rounded-r-md dark:bg-gray-300 peer-checked:dark:bg-violet-400">
          Annually
        </span>
      </label>
    </div>
  );
}

export default InfoButtons