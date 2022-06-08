import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { generatePersistConfig } from 'utilities/helper';

const initialState: any = {
    namesList: [],
    listTodo: {
        data: [],
    },
    updateProfile: {},
};

const nameTodoSlice = createSlice({
    name: 'nameTodo',
    initialState,
    reducers: {
        updateTodo: (state, { payload }) => {
            return { ...state, namesList: [state.namesList, ...payload] };
        },
        updateNamesList: (state, { payload }) => {
            return { ...state, namesList: [...state.namesList, ...payload] };
        },
        deleteNamesList: (state, { payload }) => {
            return { ...state, namesList: [...payload] };
        },
        updateUserProfile: (state, { payload }) => {
            console.log(payload);
            return { ...state, updateProfile: { ...payload } };
        },
        searchUSer: (state, { payload }) => {
            return { ...state, namesList: [...payload] };
        },
    },
});

const persistConfig = generatePersistConfig('nameTodo', [initialState.namesList]);

export const { updateTodo, updateNamesList, deleteNamesList, updateUserProfile, searchUSer } = nameTodoSlice.actions;
export default persistReducer<any>(persistConfig, nameTodoSlice.reducer);
