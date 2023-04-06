
'use client';

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/redux/api";
import { useAppSelector, useAppDispatch } from '@/redux/hook'
import { authActions } from "@/redux/reducer/authReducer";
import jwtDecode from "jwt-decode";




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
    <div>
      callback
    </div>
  )
}