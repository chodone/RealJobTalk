
import CompanyNews from '@/components/CompanyNews'

type Props = {
  params: {
    company: string;
    enterpriseId:number
  };
};

export default async function CompanyPage({ params: { company,enterpriseId } }: Props) {
  
  const companyName = decodeURI(company)
  const enterpriseId_ = enterpriseId
  
  return (
    <h1>
      <CompanyNews enterpriseId={enterpriseId_}/>
    </h1>
  )
  
}