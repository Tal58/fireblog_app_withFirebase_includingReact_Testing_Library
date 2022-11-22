import Register from '../Register';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from "react-redux";
import store from "../../app/store";

const mockedSet = jest.fn();
const MockRegister = ()=>{
    return (
        <BrowserRouter>
          <Provider store={store}>
          <Register />
          </Provider>
     
        </BrowserRouter>
    )
}


describe('Register', () => {
    it('should exist', () => {
        expect(MockRegister).toBeCalled;
    });
});

it('should fetch and render input element', async () => {
    render(
        <MockRegister />
    );
    const followerDivElement = await screen.findByTestId(`trial`)
    expect(followerDivElement).toBeInTheDocument();
});

it('should fetch and render button', async () => {
    render(
        <MockRegister />
        
    );

    const buttonElement = await screen.findAllByTestId("email")
    expect(buttonElement).toBeEnabled;
});

it('should fetch and render button', async () => {
    render(
        <MockRegister />
        
    );

    const buttonElement = await screen.findAllByTestId("password")
    expect(buttonElement).toBeEnabled;
});