import { toastErrorNotify, toastSuccessNotify,toastWarnNotify } from "../ToastNotify";

const data = "data"


describe('toastErrorNotify', () => {
  it('should exist', () => {
   expect(toastErrorNotify).toBeCalled;
  });

  describe("should post value", ()=>{
    it('should present data', async() => {
   expect(toastErrorNotify(data)).toHaveReturned
       });

})
});

describe('toastSuccessNotify', () => {
  it('should exist', () => {
   expect(toastSuccessNotify).toBeCalled;
  });

  describe("should post value", ()=>{
    it('should present data', async() => {
   expect(toastSuccessNotify(data)).toHaveReturned
       });

})
});

describe('toastWarnNotify', () => {
  it('should exist', () => {
   expect(toastWarnNotify).toBeCalled;
  });

  describe("should post value", ()=>{
    it('should present data', async() => {
   expect(toastWarnNotify(data)).toHaveReturned
       });

})
});












