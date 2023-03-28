import { getcompany } from '@/service/getCompany'
import Link from 'next/link'
import Image from 'next/image';

export default async function RootLayout({
  children, params
}: {
    children: React.ReactNode;
    params: {
      company: string;
      url: string;
    }
})
{
  
  const company = decodeURI(params.company)
  const getValue = await getcompany(company)

  const companyUrl = getValue?.url 
  



  return (
    <>
      <div className='flex flex-row'>
        <div className="flex space-x-10 px-40 mt-10 mb-2 basis-7/8">
        <Link className="font-bold" href={`${company}/info`}>기업 정보 </Link>
        <Link className="font-bold" href={`${company}/news`}>기업 뉴스 </Link>
        <Link className="font-bold" href={`${company}/reviews`}>합격 후기 </Link>
          <Link className="font-bold" href={`${company}/user`}>스크랩 </Link>
        </div>
        <div >
          <Image className=" h-68 w-24 mt-9 mb-2" src={companyUrl} alt="" width={400} height={400} />
          </div>
      </div>
      <hr />
      <div>
        {children}
      </div>
    </>
  )
}