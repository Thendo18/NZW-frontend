import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async action to fetch regions
export const fetchRegions = createAsyncThunk('regions/fetchRegions', async () => {
    const response = await fetch('https://localhost:7135/api/Regions');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Fetched data:', data); // Log the parsed JSON data
    return data;

});

const regionsSlice = createSlice({
    name: 'regions',
    initialState: {
        data: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRegions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRegions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchRegions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default regionsSlice.reducer;
