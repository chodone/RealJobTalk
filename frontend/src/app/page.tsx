import Head from "next/head";
import { getCompanies } from "@/service/getCompany";
import Company from "@/components/Company";
import HomeCompany from '@/components/HomeCompany'

export default async function Home() {

  const companies = await getCompanies()


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <HomeCompany/>
      </div>
    </div>
  );
}

