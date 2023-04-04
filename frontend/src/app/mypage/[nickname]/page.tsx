import Mypage from '@/components/Mypage'

type Props = {
  params: {
    nickname: string;
    email: string;
  }
}

export default function Newpage({ params :{nickname,email} }: Props) {
  

  
  return (
    <div>
      <Mypage  />
    </div>
  )
  
}