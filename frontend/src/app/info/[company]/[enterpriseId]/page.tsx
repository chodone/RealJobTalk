
import { getcompany } from "@/service/getCompany"
import CompanyInfo from "@/components/CompanyInfo";
import CompanyImage from "@/components/CompanyImage";
import UrlButtons from "@/components/UrlButtons/UrlButtons";

type Props = {
  params: {
    company: string,
    enterpriseId: number
    
  }
}

interface Data{
  id: number,
	name: string,
	imgUrl: string,
	homepageUrl:string,
	recruitpageUrl: string,
	blogUrl:string,
	youtubeUrl:string
	businessInformation:string,
	idealTalent:string
}

export default async function CompanyPage({ params :{company, enterpriseId} }: Props) {

    const companyName = decodeURI(company)
    const enterpriseId_ = enterpriseId

  // const companyInfo = await fetch(`http://localhost:8082/api/enterprise/${enterpriseId}`,{
  //   method: "get",
  //   headers: {
  //     "Content-Type": "application/json;charset=utf-8",
  //   }
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     return data
  //   })
  


  
  
  return (
    <div >
      <CompanyInfo company={companyName} enterpriseId={enterpriseId_} />
    </div>
  )
  
}