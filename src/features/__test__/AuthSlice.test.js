import { fetchStart, registerSuccess,loginSuccess,logoutSuccess,fetchFail, setuserData } from "../authSlice";

const data = "data"

describe('Register Success', () => {
    it('should exist', () => {
     expect(registerSuccess).toBeCalled;
    });

  describe("should return truthy value", ()=>{
      it('should return a truthy', async() => {
     expect(registerSuccess("user")).toBeTruthy
         });

})
});

describe('fetchStart', () => {
  it('should exist', () => {
   expect(fetchStart).toBeCalled;
  });

describe("should return truthy value", ()=>{
    it('should return a truthy', async() => {
   expect(fetchStart(data)).toBeDefined
       });

})
});

describe('loginSuccess', () => {
  it('should exist', () => {
   expect(fetchStart).toBeCalled;
  });

describe("should return truthy value", ()=>{
    it('should return a truthy', async() => {
   expect(loginSuccess(data)).toBeDefined
       });

})
});

describe('logoutSuccess', () => {
  it('should exist', () => {
   expect(fetchStart).toBeCalled;
  });

describe("should return truthy value", ()=>{
    it('should return a truthy', async() => {
   expect(logoutSuccess(data)).toBeDefined
       });

})
});

describe('fetchFail', () => {
  it('should exist', () => {
   expect(fetchFail).toBeCalled;
  });

describe("should return truthy value", ()=>{
    it('should return a truthy', async() => {
   expect(fetchFail(data)).toBeDefined
       });

})
});

describe('setuserData', () => {
  it('should exist', () => {
   expect(setuserData).toBeCalled;
  });

describe("should return truthy value", ()=>{
    it('should return a truthy', async() => {
   expect(setuserData(data)).toBeDefined
       });

})
});








