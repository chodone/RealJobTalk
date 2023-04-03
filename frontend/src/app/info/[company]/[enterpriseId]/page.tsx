import { getcompany } from "@/service/getCompany"
import CompanyImage from "@/components/CompanyImage";
import api from "@/redux/api";

type Props = {
  params: {
    company: string,
    enterpriseId: number
    
  }
}

export default async function CompanyPage({ params :{company, enterpriseId} }: Props) {
  
  
  
  
  return (
    <div>
      <CompanyImage company={company} />
    </div>
  )
  
}