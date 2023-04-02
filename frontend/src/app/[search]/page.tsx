

type Props = {
  params: {
    search: string
  }
}

export default async function CompanyPage({ params :{search} }: Props) {
  

  
  return (
    <h1>
      {search}
    </h1>
  )
  
}