import { createSlice } from '@reduxjs/toolkit';

const byRangeSlice = createSlice({
    name: 'rangePrice',
    initialState: {
        rangePrice: ''
    },
    reducers: {
        setRangePrice: (state, action) => {
            state.rangePrice = action.payload;
        }
    }
});

export const { setRangePrice } = byRangeSlice.actions;
export default byRangeSlice.reducer;