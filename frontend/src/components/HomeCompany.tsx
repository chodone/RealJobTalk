"use client";
import React from "react";
import { getData } from "@/redux/reducer/reducer";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { useEffect } from "react";
import Company from "@/components/Company";
import Carousel from "better-react-carousel";

const HomeCompany = () => {
  const dispatch = useAppDispatch();
  const companies = useAppSelector((state) => state.action);
  const datas = companies.data;

  useEffect(() => {
    dispatch(getData());
  }, []);
  return (
    <div>
      <Carousel cols={4} rows={4} loop>
            {datas.map((company, idx) => (
              <Carousel.Item key={idx}><Company company={company} key={idx} /></Carousel.Item>
            ))}
      </Carousel>
    </div>
  );
};

export default HomeCompany;

// className="grid grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-8 items-center"
