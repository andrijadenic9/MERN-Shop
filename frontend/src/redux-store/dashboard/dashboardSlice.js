import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        show: false
    },
    reducers: {
        showDashboard: (state, action) => {
            state.show = action.payload;
        }
    }
});

export const { showDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;