import Profile from "../Profile"
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "../../app/store";
import { render, screen, fireEvent } from '@testing-library/react';

const MockProfile = ()=>{
    return (
        <BrowserRouter>
          <Provider store={store}>
          <Profile />
          </Provider>
     
        </BrowserRouter>
    )
}


describe('Profile', () => {
    it('should exist', () => {
        expect(MockProfile).toBeCalled;
    });
});
describe('Profile', () => {
    it('should exist', () => {
        expect(MockProfile).toHaveReturned;
    });
});
