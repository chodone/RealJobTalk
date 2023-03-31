import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../api'

const initialState = {
  data: {},
  loading:{}
}

export const getData = createAsyncThunk(
  "getcompany",
    async () => {
    const company = await api.get('/api/enterprise')

    return company
  }
)

const Reducer = createSlice({
  name: "reducer",
  initialState,
  reducers: {

    
  }, extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.loading = 'pending';
    })
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload;
      console.log(action.payload)
    })
    builder.addCase(getData.rejected, (state) => {
      state.loading = 'failed';
    })
  }

})

export const newactions = Reducer.actions;
export default Reducer;