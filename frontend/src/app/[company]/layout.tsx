import { getcompany } from "@/service/getCompany";
import Image from "next/image";
import Link from "next/link";
import UnderNav from "@/components/UnderNav";


const nav_item =
[
  {
    'item': '기업정보',
    'dir': '',
    },
    {
      'item': '기업뉴스',
      'dir': '/news',
    },
    {
      'item': '합격후기',
      'dir': '/reviews',
    },
    {
      'item': '스크랩',
      'dir': '/user',
    }
]

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    company: string
    enterpriseId:number
  };
}) {


  const company = decodeURI(params.company);
  
  const getValue = await getcompany(company);
  
  

  const companyUrl = getValue?.url as unknown as string;

  return (
    <>
      <div className="flex flex-row">
        <div className="flex space-x-10 px-40 mt-10 mb-2 basis-7/8">
          {nav_item.map((item, idx) => <Link href={`${company}${item['dir']}`} key={idx}><UnderNav item={item['item']} id={idx}  key={idx}/></Link>)} 

          {/* <Link className="font-bold" href={`${company}/info`}>
            기업 정보{" "}
          </Link>
          <Link className="font-bold" href={`${company}/news`}>
            기업 뉴스{" "}
          </Link>
          <Link className="font-bold" href={`${company}/reviews`}>
            합격 후기{" "}
          </Link>
          <Link className="font-bold" href={`${company}/user`}>
            스크랩{" "}
          </Link> */}
        </div>
        <div className="flex-grow"></div>

        <div className="group relative">
          <div className="mr-20 group">
            <Image
              className=" h-68 w-24 mt-9 mb-2 ml-20 "
              src={companyUrl}
              alt=""
              width={400}
              height={400}
            />
          </div>
          <ul className="rounded absolute hidden group-hover:block">
            <a className="px-2text-center hover:bg-gray-400" href="">
              home
            </a>
            <a className="text-center hover:bg-gray-400" href="">
              recruite
            </a>
            <a className="px-2 text-center hover:bg-gray-400" href="">
              youtube
            </a>
          </ul>
        </div>
      </div>
      <hr />
      <div>{children}</div>
    </>
  );
}
