
import CompanyNews from '@/components/CompanyNews'

type Props = {
  params: {
    company: string;
    enterpriseId:number
  };
};

export default async function CompanyPage({ params: { company,enterpriseId } }: Props) {
  
  const enterpriseId_ = enterpriseId
  
  return (
      <CompanyNews enterpriseId={enterpriseId_}/>
  )
  
}