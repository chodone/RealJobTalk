
'use client';

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/redux/api";
import logo2 from '@public/images/logo2.png'
import { useAppSelector, useAppDispatch } from '@/redux/hook'
import { authActions } from "@/redux/reducer/authReducer";
import jwtDecode from "jwt-decode";
import Image from "next/image";



export default function KaKaoReturn() {

  const router = useRouter()
  const dispatch = useAppDispatch();
  const code = useSearchParams()?.get('code')
  console.log(code)
  useEffect(() => {
    console.log(code)

    api.post(`/api/kakao/callback`, {
      code:code
    })
      .then((res) => {
        console.log(res)
        localStorage.setItem('accessToken', res.data.accessToken)
        localStorage.setItem('refreshToken' , res.data.refreshToken)
        const data_ = jwtDecode(res.data.accessToken)
        dispatch(authActions.logIn({ data: data_ }))
        router.push("/");
      })
      .catch((err) => {
        console.debug(err)
      })
  })

  return (
    <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 justify-center">
      
      <div className="border-t-transparent border-solid animate-spin  rounded-full border-green-400 border-8 h-64 w-64">
      </div>
      <div className="flex flex-row">
        <Image className=" ml-7" src={logo2} width={61} height={69} alt="" />
        <p className="mt-5"> 카카오 로그인 중 ...</p>

      </div>
    </div>
  );
}