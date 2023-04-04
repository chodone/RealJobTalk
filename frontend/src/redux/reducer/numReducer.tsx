
"use client";

import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  num:0
}

const numReducer = createSlice({
  name: "reducer",
  initialState,
  reducers: {
    SEARCH_BY_NAV(state,action){
      state.num = action.payload.idx
    },
    RESET_NUM(state) {
      state.num = 0
    }
    
  }
})

export const numactions = numReducer.actions;
export default numReducer;