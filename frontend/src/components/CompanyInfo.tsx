'use client';

import Image from "next/image";
import { useSearchParams,  } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/redux/api";
import CompanyImage from "./CompanyImage";
import UrlButtons from "./UrlButtons/UrlButtons";

interface Data{
  "id": number,
	"name": string,
	"imgUrl": string,
	"homepageUrl":string,
	"recruitpageUrl": string,
	"blogUrl":string,
	"youtubeUrl":string
	"businessInformation":string,
	"idealTalent":string
}

const CompanyInfo =  ({ company, enterpriseId }: { company: string, enterpriseId:number }) => {
const [companyInfo_, setCompanyInfo_] = useState(Object)

  useEffect(() => {
    api
      .get(`/api/enterprise/${enterpriseId}`)
      .then(({data}:{data:Data}) => {
        setCompanyInfo_(data)
      })
      .catch((error) => {
        console.debug(error);
      });
  }, [])

  return (
    <div className="grid grid-rows-6 gap-3">
      <div className="grid grid-cols-4  row-end-2 mt-20">
        <CompanyImage imgUrl={companyInfo_.imgUrl} />
        <div className=" col-span-2">
          <UrlButtons />
        </div>
      </div>
      <hr className=" border-spacing-3" />
      <div className="row-start-3 row-end-7"></div>
    </div>
  );
}

export default CompanyInfo