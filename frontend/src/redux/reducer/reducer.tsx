import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: {},
}

const Reducer = createSlice({
  name: "reducer",
  initialState,
  reducers: {
    
  }

})

export const newactions = Reducer.actions;
export default Reducer;