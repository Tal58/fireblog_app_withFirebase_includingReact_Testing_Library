import { toastErrorNotify, toastSuccessNotify,toastWarnNotify } from "../../helper/ToastNotify";
import { writeUserData,updateDB,commentDB,likesDB,removeDB } from "../firebaseDatabase";
import database from "../firebaseDatabase";

const data = "data"
const data2 = [123, "currentUser", "title", "content", "url", "country", "flag", "date", "likeNumber", "comment"]
const data3 = [123, "currentUser", "title", "content", "url", "country", "flag", "date", "likeNumber"]

describe('Database should exist', () => {
    it('should exist', () => {
     expect(database).toBeDefined;
    });
});

describe('writeUSerData', () => {
  it('should exist', () => {
   expect(writeUserData).toBeCalled;
  });

  describe("should post value", ()=>{
    it('should post a value', async() => {
   expect(writeUserData(data)).toHaveReturned;
   expect( toastSuccessNotify("New Post created")).toBeCalled
       });

})
})
describe("should post value", ()=>{
  it('should post a value', async() => {
 expect(writeUserData()).toBeInvalid;
 expect(toastErrorNotify("Failed post... please check your inputs")).toBeCalled
     });

})



describe('updateDb', () => {
  it('should exist', () => {
   expect(updateDB).toBeCalled;
  });

  describe("should post value", ()=>{
    it('should post a value', async() => {
   expect(updateDB(data)).toHaveReturned
       });

})
});

describe('commentDB', () => {
  it('should exist', () => {
   expect(commentDB).toBeCalled;
  });

  describe("should post value", ()=>{
    it('should post a value', async() => {
   expect(commentDB(...data2)).toHaveReturned
   expect( toastSuccessNotify("Your comment added")).toBeCalled
       });

})
});


describe('likesDB', () => {
  it('should exist', () => {
   expect(likesDB).toBeCalled;
  });

  describe("should post value", ()=>{
    it('should post a value', async() => {
   expect(likesDB(...data3)).toHaveReturned
   expect( toastSuccessNotify("You liked post :)")).toBeCalled
       });

})
});



describe('removeDB', () => {
  it('should exist', () => {
   expect(removeDB).toBeCalled;
  });

  describe("should post value", ()=>{
    it('should erase this post', async() => {
   expect(removeDB(123)).toHaveReturned
       });

})
});












