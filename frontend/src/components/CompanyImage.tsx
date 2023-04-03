'use client';

import Image from "next/image";
import { useSearchParams,  } from "next/navigation";


const CompanyImage = ({company}:{company:string}) => {

  const params = useSearchParams()
  const enterpriseId = params?.get('enterpriseId')
  console.log(company)

  return (
    <div className="group relative">
      <div className="mr-20 group">
        {/* <Image
          className=" h-68 w-24 mt-9 mb-2 ml-20 "
          src={companyUrl}
          alt=""
          width={400}
          height={400}
        /> */}
      </div>
      <ul className="rounded absolute hidden group-hover:block">
        <a className="px-2text-center hover:bg-gray-400" href="">
          home
        </a>
        <a className="text-center hover:bg-gray-400" href="">
          recruite
        </a>
        <a className="px-2 text-center hover:bg-gray-400" href="">
          youtube
        </a>
      </ul>
    </div>
  );
}

export default CompanyImage