'use client';

import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from 'jwt-decode'
import { useEffect } from "react";

interface DecodedToken {
  email: string;
  nickname: string;
  // ... other properties
}



let initialState = {
  isLogined: false,
  email: '',
  nickname: ''
}




const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    logIn(state, action) {
      state.isLogined = true
      state.email = action.payload.data.email
      state.nickname = action.payload.data.nickname
    },

    logOut(state) {
      state.isLogined = false
      state.email = ''
      state.nickname = ''
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      // api 요청 필요
    },
    

    checkAccessToken(state) {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        return;
      }
      
      try {
        // 나중에 만료시간 관련 처리도 해야한다
        const data_ = jwtDecode(localStorage.getItem('accessToken') ?? '') as DecodedToken;
        console.log(data_);
        state.isLogined = true;
        state.email = data_.email;
        state.nickname = data_.nickname;
      } catch (error) {
        // 에러 처리
        console.log(error);
      }
    }
    
    

  }
});

export const authActions = authReducer.actions
export default authReducer.reducer;