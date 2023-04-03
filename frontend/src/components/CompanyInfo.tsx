'use client';

import Image from "next/image";
import { useSearchParams,  } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/redux/api";
import CompanyImage from "./CompanyImage";

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
    <div>
      <CompanyImage imgUrl={companyInfo_.imgUrl} />
    </div>
  );
}

export default CompanyInfo