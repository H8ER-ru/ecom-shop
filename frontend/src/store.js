import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {productDetailsReducers, productListReducers} from "./reducers/productReducers";
import {cartReducers} from "./reducers/cartReducers";

const reducer = combineReducers({
    productsList: productListReducers,
    productDetails: productDetailsReducers,
    cart: cartReducers
})

let cartItemsFromStorage = localStorage.getItem('cartItems')
cartItemsFromStorage = cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : []


const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
    }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store