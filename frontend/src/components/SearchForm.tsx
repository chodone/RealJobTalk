"use client";
import React from "react";
import { getData } from "@/redux/reducer/reducer";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { useEffect, useState } from "react";
import Company from "@/components/Company";
import Carousel from "better-react-carousel";

export interface dbObject {
  name: string;
  imgUrl: string;
}

const SearchForm = () => {
  let [filteredList, setfilteredList] = useState([]);
  const companies = useAppSelector((state) => state.action);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (companies.keyword !== "") {
      let datas = companies.data;

      let list = datas.filter((company: dbObject) => company.name.includes(companies.keyword));

      setfilteredList(list);
    } else {
      let datas = companies.data;

      setfilteredList(datas);
    }

    dispatch(getData());
  }, [companies.keyword]);

  return (
    <Carousel cols={4} rows={6}>
      {filteredList.map((company, idx) => (
        <Carousel.Item key={idx}>
          <Company company={company} key={idx} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default SearchForm;
