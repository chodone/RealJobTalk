'use client';

import Image from "next/image";
import { useSearchParams,  } from "next/navigation";


const CompanyImage = ({imgUrl}:{imgUrl:string}) => {

  
  console.log(imgUrl)

  return (
    <div className=" group flex relative justify-center items-center">
      <div className="group">
        <Image
          className=" h-80 w-80 "
          src={imgUrl}
          alt=""
          width={300} height={100}
          style={{ width: 300, height: 100 }}
        />
      </div>
    </div>
  );
}

export default CompanyImage