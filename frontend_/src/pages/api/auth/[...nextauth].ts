import NextAuth from 'next-auth'
import KakaoProvider from 'next-auth/providers/kakao'

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: 'secret',
  },
  providers: [
    KakaoProvider({
      clientId: process.env.REACT_APP_REST_API_KEY!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  
})