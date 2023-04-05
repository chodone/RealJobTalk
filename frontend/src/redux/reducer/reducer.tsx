
"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../api'

const initialState = {
  data: [],
  keyword:""

  
}

export const getData = createAsyncThunk(
  "getcompany",
    async () => {
      const company = await api.get('/api/enterprise')
      

    return company.data
  }
)



const Reducer = createSlice({
  name: "reducer",
  initialState,
  reducers: {
    SEARCH_BY_NAME(state,action){
      state.keyword = action.payload.keyword
    },
    
    
  }, extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
    })
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload;
    })
    builder.addCase(getData.rejected, (state) => {
    })
  }

})

export const newactions = Reducer.actions;
export default Reducer;