import Login from '../Login';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from "react-redux";
import store from "../../app/store";

const mockedSet = jest.fn();
const MockLogin = ()=>{
    return (
        <BrowserRouter>
          <Provider store={store}>
          <Login />
          </Provider>
     
        </BrowserRouter>
    )
}


describe('Login', () => {
    it('should exist', () => {
        expect(MockLogin).toBeCalled;
    });
});

it('should fetch and render input element', async () => {
    render(
        <MockLogin />
    );
    const followerDivElement = await screen.findByTestId(`trial`)
    expect(followerDivElement).toBeInTheDocument();
});

it('should fetch and render button', async () => {
    render(
        <MockLogin />
        
    );

    const buttonElement = await screen.findAllByTestId("email")
    expect(buttonElement).toBeEnabled;
});

it('should fetch and render button', async () => {
    render(
        <MockLogin />
        
    );

    const buttonElement = await screen.findAllByTestId("password")
    expect(buttonElement).toBeEnabled;
});