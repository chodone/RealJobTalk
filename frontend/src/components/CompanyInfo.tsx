'use client';

import Image from "next/image";
import { useSearchParams,  } from "next/navigation";
import { useEffect } from "react";
import api from "@/redux/api";


const CompanyInfo = async ({ company }: { company: string }) => {
  // const params = useSearchParams()
  // const enterpriseId = params?.get('enterpriseId')

  // useEffect(() => {
  //   const companyInfo = api.get()
  // }, [])
  


  // const params = useSearchParams()
  // const enterpriseId = params?.get('enterpriseId')
  // console.log(company)

  return (
    <>
    </>
  );
}

export default CompanyInfo