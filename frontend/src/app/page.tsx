import Head from "next/head";
import HomeCompany from "@/components/HomeCompany";

export default async function Home() {
  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mt-10">
        <HomeCompany />
      </div>
    </div>
  );
}