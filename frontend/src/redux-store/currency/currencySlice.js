import { createSlice } from '@reduxjs/toolkit';

const getSymbol = () => {
    if (localStorage.currency === 'USD') return '$'
    if (localStorage.currency === 'EUR') return '€'
    if (localStorage.currency === 'RSD') return 'дин'
    else return '$'
}

const currencySlice = createSlice({
    name: 'currency',
    initialState: {
        currency: localStorage.currency ? localStorage.currency : 'USD',
        symbol: getSymbol(),
        price: ''
    },
    reducers: {
        setCurrency: (state, action) => {
            state.currency = action.payload;
            if (state.currency === 'USD') state.symbol = '$'
            if (state.currency === 'EUR') state.symbol = '€'
            if (state.currency === 'RSD') state.symbol = 'дин'
            // console.log(state.currency, 'from redux');
            // console.log(state.symbol, 'from redux');
        },

        // ! NOT WORKING 
        // // * GETING PRICESES
        // checkPrice: (state, action) => {
        //     let productPrice = action.payload.price;
        //     if (state.currency === 'USD') {
        //         var price = productPrice;
        //         // return state.getEndPrice(price);
        //     }
        //     if (state.currency === 'EUR') {
        //         var price = productPrice * 0.98;
        //         // return state.getEndPrice(price);
        //     }
        //     if (state.currency === 'RSD') {
        //         var price = productPrice * 118.32;
        //         // return state.getEndPrice(price);
        //     }
        //     const endPrice = price.toFixed(2).split('');
        //     if (endPrice.length > 6 && endPrice.length < 10) {
        //         endPrice.splice(-6, 0, ',');
        //     } else if (endPrice.length >= 10) {
        //         endPrice.splice(-6, 0, ',');
        //         endPrice.splice(-10, 0, ',');
        //     }
        //     return endPrice;
        // },
        // // * MAKING PRICESES LOOK
        // getEndPrice: (state, action) => {
        //     const endPrice = price.toFixed(2).split('');
        //     if (endPrice.length > 6 && endPrice.length < 10) {
        //         endPrice.splice(-6, 0, ',');
        //     } else if (endPrice.length >= 10) {
        //         endPrice.splice(-6, 0, ',');
        //         endPrice.splice(-10, 0, ',');
        //     }
        //     return endPrice;
        // }

        // ! NOT WORKING end

    }
});

export const { setCurrency, checkPrice } = currencySlice.actions;
export default currencySlice.reducer;