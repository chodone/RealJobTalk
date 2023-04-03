'use client';

import Image from "next/image";
import { useSearchParams,  } from "next/navigation";


const CompanyInfo = ({ company }: { company: string }) => {
  


  const params = useSearchParams()
  const enterpriseId = params?.get('enterpriseId')
  console.log(company)

  return (
    <>
    </>
  );
}

export default CompanyInfo