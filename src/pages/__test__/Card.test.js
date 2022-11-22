import Cards from "../Card";
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "../../app/store";
import { toastErrorNotify } from "../../helper/ToastNotify";


const mockedSetFn = jest.fn();
const MockCards = ()=>{
    return (
        <BrowserRouter>
          <Provider store={store}>
          <Cards />
          </Provider>
     
        </BrowserRouter>
    )
}

describe('Cards', () => {
    it('should exist', () => {
        expect(Cards).toBeCalled;
    });
});



it('should fetch and render input element', async () => {
    render(
        <MockCards />
    );
    const followerDivElement = await screen.findByTestId(`trial`)
    expect(followerDivElement).toBeInTheDocument();
});


it('should fetch and render input element', async () => {
    render(
        <MockCards />
    );
    expect(toastErrorNotify).toBeCalled;
});


it('should fetch and render input element', async () => {
    render(
        <MockCards />
    );
    const FindImage = screen.findAllByRole("img")
    expect(FindImage).toBeInTheDocument
});

it('should fetch and render input element', async () => {
    render(
        <MockCards />
    );
    const FindText = screen.findAllByRole("textbox")
    expect(FindText).toBeInTheDocument
});

it('should fetch and render input element', async () => {
    render(
        <MockCards />
    );
    const FindText = screen.findAllByRole("button")
    expect(FindText).toBeInTheDocument
});


it('should fetch and render input element', async () => {
    render(
        <MockCards props={mockedSetFn}/>
    );
    const FindList = screen.findByRole("list")
    expect(FindList).toBeInTheDocument
});
