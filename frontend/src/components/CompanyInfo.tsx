"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import api from "@/redux/api";
import CompanyImage from "./CompanyImage";
import UrlButtons from "./UrlButtons/UrlButtons";
import { render } from 'react-dom';
import WordCloud from 'react-d3-cloud';

import InfoButtons from "./InfoButtons";

interface Data{
  id: number,
	name: string,
	imgUrl: string,
	homepageUrl:string,
	recruitpageUrl: string,
	blogUrl:string,
	youtubeUrl:string
	businessInformation:string,
  idealTalent: string
  
  
}

interface Words {
  text: string;
  value: number;
}




const businessInfo = "businessInfo";
const keyword = "keyword";

const CompanyInfo = ({ company, enterpriseId }: { company: string; enterpriseId: number }) => {
  const [companyInfo_, setCompanyInfo_] = useState(Object);
  const [tab, setTab] = useState(businessInfo);

  const [wordCount, setwordCount] = useState(Array<Words>);

  const onClick = useCallback((item: string) => {
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
      })
      .catch((error) => {
        console.debug(error);
      });

    api
      .get(`/api/enterprise/${enterpriseId}/keyword`)
      .then(({ data }: { data:Array<Words> }) => {
        setwordCount(data);
        console.log(data);
      })
      .catch((error) => {
        console.debug(error);
      });
  }, []);

  console.log(wordCount[0])

  return (
    <div className="grid grid-rows-7  mx-36">
      <div className="grid grid-cols-10 row-end-2 mt-10">
        <div className="pt-4  col-span-2 ml-4 ">
          <CompanyImage imgUrl={companyInfo_.imgUrl} />
        </div>
        <div className=" col-span-4">
          <UrlButtons companyInfo={companyInfo_} />
        </div>
      </div>
      <hr className=" border-spacing-8" />

      <div className="row-start-3 row-end-7">
        <div className=" grid grid-cols-2  mt-4 ml-4 divide-x">
          <div className="justify-center">
            <div className="flex justify-center">
              <div className=" w-48 border border-[#02E86E] mb-3 text-center rounded-lg">
                기업개요
              </div>
            </div>
            <div>
              <p>{companyInfo_.businessInformation}</p>
            </div>
          </div>

          <div className="justify-center">
            <div className="flex justify-center">
              <div className="w-48 border border-[#02E86E] mb-3 text-center rounded-lg">
                워드클라우드
              </div>
            </div>
            <div>
              <WordCloud data={wordCount} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
