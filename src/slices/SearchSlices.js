import { createSlice } from '@reduxjs/toolkit';

// Slice for filters
export const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        values: [
            { min: 0, max: 55 },
            { min: 0, max: 1157 },
            { min: 0, max: 600 },
        ],
    },
    reducers: {
        updateFilter: (state, action) => {
            const { index, newValue } = action.payload;
            state.values = state.values.map((filter, i) =>
                i === index ? { ...filter, min: newValue[0], max: newValue[1] } : filter
            ); },
    },
});

// Slice for sorting
export const sortingSlice = createSlice({
    name: 'sorting',
    initialState: {
        selection1: { label: 'Seleziona...', value: null },
        selection2: { label: 'Seleziona...', value: null },
    },
    reducers: {
        setSelection1: (state, action) => {
            state.selection1 = action.payload;
        },
        setSelection2: (state, action) => {
            state.selection2 = action.payload;
        },
    },
});