import { configureStore } from '@reduxjs/toolkit';
import regionsReducer from './slices/regionsSlice';

const store = configureStore({
    reducer: {
        regions: regionsReducer,
    },
});

export default store;
