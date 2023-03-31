'use client'
import React from 'react'
import {getData} from '@/redux/reducer/reducer'
import { useAppSelector, useAppDispatch } from '@/redux/hook'
import { useEffect } from 'react'
import Company from "@/components/Company";

const HomeCompany = () => {
  const dispatch = useAppDispatch();
  const companies = useAppSelector((state) => state.action)
  const datas = companies.data;
  const getAuth = useAppSelector((state) => state.auth)
  
  useEffect(() => {
    dispatch(getData())
    console.log(getAuth)
  },[])
  return (
    <div>
        <div className="grid grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-8 items-center">
          {datas.map((company, idx) => (
          <Company company={company} key={idx} />
        ))}
      </div>
    </div>
  )
}

export default HomeCompany
