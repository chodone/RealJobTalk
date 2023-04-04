'use client';

import Image from "next/image";
import { useSearchParams,  } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import api from "@/redux/api";
import CompanyImage from "./CompanyImage";
import UrlButtons from "./UrlButtons/UrlButtons";
import InfoButtons from "./InfoButtons";

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

const businessInfo = "businessInfo";
const keyword = "keyword";

const CompanyInfo =  ({ company, enterpriseId }: { company: string, enterpriseId:number }) => {
  const [companyInfo_, setCompanyInfo_] = useState(Object);
  const [tab, setTab] = useState(businessInfo);

  const onClick = useCallback((item:string) => {
    setTab(item);
  }, []);
  
  const selected =
    "inline-block px-7 py-3 border-2 border-green-400 text-green-600 rounded-sm  active ";
  const deselected =
    "inline-block px-7 py-3 border-2 rounded-sm hover:text-gray-600 hover:bg-gray-50 ";

  useEffect(() => {
    api
      .get(`/api/enterprise/${enterpriseId}`)
      .then(({ data }: { data: Data }) => {
        setCompanyInfo_(data);
        console.log(data)
      })
      .catch((error) => {
        console.debug(error);
      });
  }, []);

  return (
    <div className="grid grid-rows-7  mx-36">
      <div className="grid grid-cols-10 row-end-2 mt-20">
        <div className=" col-start-1 col-span-2 mt-4 ml-4 ">
          <CompanyImage imgUrl={companyInfo_.imgUrl} />
        </div>
        <div className=" col-span-4">
          <UrlButtons companyInfo={companyInfo_} />
        </div>
      </div>
      <hr className=" border-spacing-8" />
      <div className="row-start-3 row-end-7">
        <div className="grid grid-cols-10 row-end-2 ">
          <div className=" col-start-1 col-span-3 mt-4 ml-4 ">
            <div className=" group flex relative justify-center items-center">
              <ul className="pt-3 pl-3 flex flex-wrap text-lg font-medium text-center text-gray-500  ">
                <li className="mr-2">
                  <div
                    className={tab == businessInfo ? selected : deselected}
                    onClick={() => onClick(businessInfo)}
                  >
                    <p className="text-sm">
                      사업개요
                    </p>
                  </div>
                </li>
                <li className="mr-2">
                  <div
                    className={tab == keyword ? selected : deselected}
                    onClick={() => onClick(keyword)}
                  >
                    <p className="text-sm">
                      키워드
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className=" col-span-4">
          <p className=" text-xl">
            {companyInfo_.businessInformation}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CompanyInfo