import { getcompany } from "@/service/getCompany"
import CompanyInfo from "@/components/CompanyInfo";
import CompanyImage from "@/components/CompanyImage";


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
  


  const companyInfo = await fetch(`http://localhost:8082/api/enterprise/${enterpriseId}`,{
    method: "get",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    }
  })
    .then((response) => response.json())
    .then((data) => {
      return data
    })
  


  
  
  return (
    <div className="grid grid-rows-6 gap-10">
      <div className="grid grid-cols-3  row-end-2 mt-20">
        <CompanyImage imgUrl={companyInfo.imgUrl} />
        
      </div>
      <div className="row-start-3 row-end-7">

      </div>
    </div>
  )
  
}