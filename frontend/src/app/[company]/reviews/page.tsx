import { getcompany } from "@/service/getCompany"

type Props = {
  params: {
    company: string
  }
}

export default async function CompanyPage({ params :{company} }: Props) {
  
  const companyName = await getcompany(decodeURI(company));
  
  return (
    <h1>
      기업후기
    </h1>
  )
  
}