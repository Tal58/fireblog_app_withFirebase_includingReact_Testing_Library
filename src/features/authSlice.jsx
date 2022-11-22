import { createSlice } from "@reduxjs/toolkit";

//create reducers

const authSlice = createSlice({
  name: "auth",

  initialState: {
    currentUser: null,
    loading: false,
    error: false,
    photoURL:null,
    displayName:null,
    token: null,
    userData:null,
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      state.token = payload?.["user"]["accessToken"];
      state.displayName = payload?.["user"]["displayName"]; 
      state.currentUser = payload?.["user"]["email"];
      state.photoURL = payload?.["user"]["photoURL"];     
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.currentUser = null;
      state.photoURL = null; 
      state.displayName = null;  
      state.token = null;
    },
    registerSuccess: (state, { payload }) => {
      state.loading = false;
      state.token = payload?.["user"]["accessToken"];
      state.currentUser = payload?.["user"]["email"];
      state.error = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    setuserData:(state,{payload})=>{
      console.log(payload);
      state.userData= payload
    },
  },
});

export const {
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  fetchFail,
  setuserData,
} = authSlice.actions;
export default authSlice.reducer;
