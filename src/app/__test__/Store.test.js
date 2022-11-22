import {store} from "../store"
import authReducer from "../../features/authSlice";
import { configureStore } from "@reduxjs/toolkit";

describe('store', () => {
    it('should exist', () => {
     expect(store).toBeCalled;
    });
  
  });

describe("should return truthy value",()=>{
    it('should return a truthy', async() => {
        await expect(configureStore({
         reducer: {
           auth: authReducer,
         },
         devTools: process.env.NODE_ENV !== "production",
       })).toBeTruthy;
       });
})
