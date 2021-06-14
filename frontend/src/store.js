import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {productDetailsReducers, productListReducers} from "./reducers/productReducers";
import {cartReducers} from "./reducers/cartReducers";
import {userLoginReducer} from "./reducers/userReducers";

const reducer = combineReducers({
    productsList: productListReducers,
    productDetails: productDetailsReducers,
    cart: cartReducers,
    userLogin: userLoginReducer
})

let cartItemsFromStorage = localStorage.getItem('cartItems')
cartItemsFromStorage = cartItemsFromStorage ? JSON.parse(cartItemsFromStorage) : []

let userInfoFromStorage  = localStorage.getItem('userInfo')
userInfoFromStorage = userInfoFromStorage ? JSON.parse(userInfoFromStorage) : null

const initialState = {
    cart: {cartItems: cartItemsFromStorage,},
    userLogin: {userinfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store