import { getcompany } from "@/service/getCompany"
import NewsCard from '@/components/NewsCard'

type Props = {
  params: {
    company: string
  }
}

export default async function CompanyPage({ params :{company} }: Props) {
  
  const companyName = await getcompany(decodeURI(company));
  
  return (
    <h1>
      <NewsCard/>
    </h1>
  )
  
}