import { getcompany } from "@/service/getCompany"
import ReviewCard from '@/components/RevieCard'

type Props = {
  params: {
    company: string
  }
}

export default async function CompanyPage({ params :{company} }: Props) {
  
  const companyName = await getcompany(decodeURI(company));
  
  return (
    <h1>

      <ReviewCard />
      <ReviewCard />
      <ReviewCard/>
    </h1>
  )
  
}