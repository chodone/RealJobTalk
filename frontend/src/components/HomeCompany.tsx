"use client";
import React from "react";
import { getData } from "@/redux/reducer/reducer";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { useEffect,useState } from "react";
import Company from "@/components/Company";
import Carousel from "better-react-carousel";

export interface dbObject {
  name: string;
  imgUrl: string;
}

const HomeCompany = () => {

  const companies = useAppSelector((state) => state.action);
  const datas = companies.data;
  const dispatch = useAppDispatch();

  useEffect(() => {


    dispatch(getData());
  }, []);

  
  const getAuth = useAppSelector((state) => state.auth)
  
  return (
      <Carousel cols={4} rows={6}>
            {datas.map((company, idx) => (
              <Carousel.Item key={idx}><Company  company={company} key={idx} /></Carousel.Item>
            ))}
      </Carousel>
  );
};

export default HomeCompany;

// className="grid grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-8 items-center"
