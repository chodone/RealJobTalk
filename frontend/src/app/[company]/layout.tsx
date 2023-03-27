import { getcompany } from '@/service/getCompany'
import Link from 'next/link'
import CompanyNavbar from '@/components/CompanyNavbar'






export default async function RootLayout({
  children, params
}: {
    children: React.ReactNode;
    params: {
      company:string
    }
})
{
  
  const company = decodeURI(params.company)
  return (
    <>
      <div className=''>
        <Link href={`${company}/info`}>기업 정보</Link>
        <Link href={`${company}/news`}>기업 뉴스</Link>
        <Link href={`${company}/reviews`}>합격 후기</Link>
        <Link href={`${company}/user`}>스크랩</Link>
      </div>
      <div>
        {children}
      </div>
    </>
  )
}