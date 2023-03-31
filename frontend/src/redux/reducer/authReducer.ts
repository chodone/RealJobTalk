import { createSlice } from "@reduxjs/toolkit";


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
      console.log(action.payload.data)
      state.email = action.payload.data.email
      state.nickname = action.payload.data.nickname
    },

    logOut(state, action) {
      state.isLogined = false
      state.email = ''
      state.nickname = ''
    }

  }
});

export const authActions = authReducer.actions
export default authReducer.reducer;