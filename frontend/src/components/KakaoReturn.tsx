// import type { NextApiRequest, NextApiResponse } from "next";
// import axios from "axios";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { code } = req.query;

//   if (code) {
//     const url = "https://kauth.kakao.com/oauth/token";
//     try {
//       // 카카오 토큰 받기
//       const { data } = await axios.post(url, null, {
//         params: {
//           grant_type: "authorization_code",
//           client_id: `${process.env.REACT_APP_REST_API_KEY}`,
//           redirect_uri: "http://localhost:3000/api/signincheck/callback",
//           code,
//         },
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       });
//       const { access_token, refresh_token } = data;
//       console.log(access_token)
//       console.log(refresh_token)

//       // // 사용자 정보 조회하기(이메일이랑 프로필 이미지 검색)
//       // const infoResult = await axios.post(
//       //   "https://kapi.kakao.com/v2/user/me",
//       //   null,
//       //   {
//       //     headers: {
//       //       Authorization: `Bearer ${access_token}`,
//       //       "Content-Type": "application/x-www-form-urlencoded",
//       //     },
//       //   }
//       // );
//       // const email = infoResult.data.kakao_account.email;
//       // const profileImage = infoResult.data.properties.profile_image;

//     } catch {
//       res.status(200).json({ error: "code가 없습니다." });
//     }
//   }
// }



'use client';

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/redux/api";




export default function KaKaoReturn() {

  // const router = useRouter()
  // const searchParams = useSearchParams()
  const code = useSearchParams()?.get('code')
  console.log(code)
  useEffect(() => {
    // const code = (router.asPath.split('?')[1] || '').split('=')[1];
    // console.log(code)
    // console.log(router)
    console.log(code)

    api.post(`/api/kakao/callback`, {
      code:code
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.debug(err)
      })
  })

  return (
    <div>
      callback
    </div>
  )
}