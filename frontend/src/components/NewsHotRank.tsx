"use client";
import React,{useEffect,useState} from "react";
import api from "@/redux/api"
import HotRankCard from "@/components/HotRankCard"

interface HOT {
  id: number;
  title: String;
  url: string;
  count : number
  isScrap : boolean;
}

const HotRank = ({enterpriseId} :{enterpriseId :number}) => {

  const [Hotrank, setHotrank] = useState(Array<HOT>);
  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
    if (accessToken) {
      api
        .get(`/api/enterprise/${enterpriseId}/news`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(({ data }: { data: Array<HOT> }) => {
          console.log("hotrank");
          console.log(data);
          setHotrank(data);
        })
        .catch((error) => {
          console.debug(error);
        });
      
    } else {
      api
        .get(`/api/enterprise/${enterpriseId}/hot_news`)
        .then(({ data }: { data: Array<HOT> }) => {
          console.log("hotrank");
          console.log(data);
          setHotrank(data);
        })
        .catch((error) => {
          console.debug(error);
        });

    }
    
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
            {Hotrank.map((item:HOT, idx:number) => (
              <HotRankCard news={item}  key={idx}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotRank;
