import { getcompany } from "@/service/getCompany"
import CompanyImage from "@/components/CompanyImage";
import api from "@/redux/api";

type Props = {
  params: {
    company: string
    
  }
}

export default async function CompanyPage({ params :{company} }: Props) {
  
  
  
  
  return (
    <div>
      <CompanyImage company={company} />
    </div>
  )
  
}