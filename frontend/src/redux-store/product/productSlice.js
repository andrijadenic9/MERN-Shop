import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: '',
        currencyPrice: []
    },
    reducers: {
        setProduct: (state, action) => {
            state.product = action.payload;
            console.log(state.product, 'PRODUCT FROM REDUX');
            // if (localStorage.currency === 'USD') {
            //     state.product.price = state.product.price;
            // }
            // if (localStorage.currency === 'EUR') {
            //     state.product.price = state.product.price * 0.98;
            // }
            // if (localStorage.currency === 'RSD') {
            //     state.product.price = state.product.price * 118;
            // }
            // console.log(state.product.price, 'PRICE');
        },
        // transformCurrency: (state, action) => {
        //     if (localStorage.currency === 'USD') {
        //         state.product.price = state.product.price;
        //     }
        //     if (localStorage.currency === 'EUR') {
        //         state.product.price = state.product.price * 0.98;
        //     }
        //     if (localStorage.currency === 'RSD') {
        //         state.product.price = state.product.price * 118;
        //     }
        //     console.log(state.product.price, 'PRICE');
        // },
        // removeCurrencyPrice: (state, action) => {
        //     // state.currencyPrice.splice(0,1);
        //     console.log(state.currencyPrice, 'CURRENCY PRICE FROM REDUX')
        // },
        setCurrencyPrice: (state, action) => {
            if (localStorage.currency === 'USD') {
                state.currencyPrice.push(action.payload);
            }
            if (localStorage.currency === 'EUR') {
                state.currencyPrice.push(action.payload * 0.98);
            }
            if (localStorage.currency === 'RSD') {
                state.currencyPrice.push(action.payload * 180);
            }
            console.log(state.currencyPrice, 'CURRENCY PRICE FROM REDUX')
        }
        // [1,2,3,4,5,6]
        // [2,3,4,5,6,1]
    }
});

export const { setProduct, setCurrencyPrice, removeCurrencyPrice,transformCurrency } = productSlice.actions;
export default productSlice.reducer;