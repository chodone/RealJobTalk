import Head from "next/head";
import {useState,useEffect} from 'react'
import Company from '../components/Company'

export default function Home() {
  type dbObject = {
    company: string;
    url: string;
  }


  const [companies,setcompanies] = useState<dbObject>()

  useEffect(() => {
    getvalue()
  }, [])
  
  const getvalue = async() => {
    let url = 'http://localhost:5000/file'
    let response = await fetch(url)
    let data = await response.json()
    setcompanies(data)
  }

  type dbProps = {
    companies: 
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        {companies}
      </div>
    </div>
  );
}