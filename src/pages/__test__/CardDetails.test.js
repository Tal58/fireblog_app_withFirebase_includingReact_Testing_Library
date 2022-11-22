import CardDetails from "../CardDetails";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "../../app/store";

const MockCardDetails = ()=>{
    return (
        <BrowserRouter>
          <Provider store={store}>
          <CardDetails />
          </Provider>
     
        </BrowserRouter>
    )
}


describe('Cards Deatils', () => {
    it('should exist', () => {
        expect(MockCardDetails).toBeCalled;
    });
});



