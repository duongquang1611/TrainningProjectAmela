import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { generatePersistConfig } from 'utilities/helper';

const initialState: any = {
    count1: 0,
    count2: 1,
    results: [],
};

const globalDataSlice = createSlice({
    name: 'globalData',
    initialState,
    reducers: {
        updateCount: (state, { payload }) => {
            return { ...state, count1: payload };
        },
        updateCount2: (state, { payload }) => {
            return { ...state, count2: payload };
        },
        updateGlobalData: (state, { payload }) => {
            return { ...state, ...payload };
        },
    },
});

const persistConfig = generatePersistConfig('globalData', ['count1', 'count2']);

export const { updateCount, updateGlobalData } = globalDataSlice.actions;
export default persistReducer<any>(persistConfig, globalDataSlice.reducer);
