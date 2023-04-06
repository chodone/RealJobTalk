'use client';

import Image from "next/image";
import { useSearchParams,  } from "next/navigation";


const CompanyImage = ({imgUrl}:{imgUrl:string}) => {


  return (
    <div className=" animate-fade-up group flex relative justify-center items-center">
      <div className="group">
        <Image
          className=" h-80 w-80 "
          src={imgUrl}
          alt=""
          width={120} height={40}
          style={{ width: 120, height: 40 }}
        />
      </div>
    </div>
  );
}

export default CompanyImage