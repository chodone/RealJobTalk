import SearchForm from '@/components/SearchForm'

type Props = {
  params: {
    search: string
  }
}

export default function CompanyPage({ params :{search} }: Props) {
  

  
  return (
    <div className=' animate-fade'>
      <SearchForm/>
    </div>
  )
  
}