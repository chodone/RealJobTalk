import { getcompany } from "@/service/getCompany";
import CompanyReview from "@/components/CompanyReviews"


type Props = {
  params: {
    company: string;
  };
};

export default async function CompanyPage({ params: { company } }: Props) {
  const companyName = await getcompany(decodeURI(company));



  return (
    <CompanyReview />
  );
}
