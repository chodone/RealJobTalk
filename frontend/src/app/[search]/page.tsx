import SearchForm from '@/components/SearchForm'

type Props = {
  params: {
    search: string
  }
}

export default function CompanyPage({ params :{search} }: Props) {
  

  
  return (
    <h1>
      <SearchForm/>
    </h1>
  )
  
}