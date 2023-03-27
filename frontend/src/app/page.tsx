import Head from "next/head";
import { getCompanies } from "@/service/getCompany";
import Company from "@/components/Company";
export interface dbObject {
  company: string;
  url: string;
}

export default async function Home() {

  // const [companies, setcompanies] = useState<dbObject[]>([]);
  const companies = await getCompanies()

  // useEffect(() => {
  //   getvalue();
  // }, []);

  // const getvalue = async () => {
  //   let url = "http://localhost:5000/file";
  //   let response = await fetch(url);
  //   let data = await response.json();
  //   setcompanies(data);
  // };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-2 desktop:grid-cols-4 laptop:grid-cols-3 gap-8 items-center">
        {companies.map((company, idx) => (
          <Company company={company} key={idx} />
        ))}
      </div>
    </div>
  );
}

