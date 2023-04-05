"use client";
import React,{useEffect,useState} from "react";
import api from "@/redux/api"

interface News {
  id: number;
  title: String;
  url: string;
  hotRank: number;
  content: String;
  dateOfIssue: String;
}

const HotRank = ({enterpriseId} :{enterpriseId :number}) => {

  const [companyInfo_, setCompanyInfo_] = useState(Object);

  useEffect(() => {
    api
      .get(`/api/enterprise/${enterpriseId}/hot_news`)
      .then(({ data }: { data: News }) => {
        console.log(data)
      })
      .catch((error) => {
        console.debug(error);
      });
  }, []);

  return (
    <div>
      <div className="ml-20 px-10 py-3 mr-20">
        <div className="bg-white pl-4 leading-normal flex">
          <div className="font-bold text-xl">
            HOT
            <br />
            ISSUE
          </div>
          <div className="grow ml-5">
            <a href=""><div>1 bla</div> </a>
            <a href=""><div>2 bla</div></a>
            <a href=""><div>3 bla</div></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotRank;
