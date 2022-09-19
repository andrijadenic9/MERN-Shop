import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users/userSlice";
import toggleForm from "./forms/toggleFormSlice";
import cartReducer from "./cart/cartSlice";
import orderProcessSlice from "./cart/orderProcessSlice";
import loaderSlice from "./loader/loaderSlice";
import dashboardSlice from "./dashboard/dashboardSlice";
import currencySlice from "./currency/currencySlice";
import ratingStarsSlice from "./rating-stars/ratingStarsSlice";
import byRangeSlice from "./currency/byRangeSlice";
import productSlice from "./product/productSlice";

export default configureStore({
    reducer: {
        userStore: userReducer,
        toggleFormStore: toggleForm,
        cartStore: cartReducer,
        orderProcessStore: orderProcessSlice,
        loaderStore: loaderSlice,
        dashboardStore: dashboardSlice,
        currencyStore: currencySlice,
        ratingStarsStore: ratingStarsSlice,
        byRangeStore: byRangeSlice,
        productStore: productSlice
    }
});