import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userDetailsInterface {
    email: string,
    firstName: string,
    plan: number,
    lastName: string,
    isActive: boolean,
    isCreator: boolean,
    activeHub?: number,
}

const initialState: userDetailsInterface = {
    email: '',
    firstName: '',
    lastName: '',
    plan: 0,
    isActive: false,
    isCreator: true,
    // activeHub: 0,
};

export const userDetailsSlice = createSlice({
    name: 'userDetails',
    initialState,
    reducers: {
        saveDetails: (state, action: PayloadAction<userDetailsInterface>) => {
            console.log('Saving user details:', action.payload);
            return action.payload;

        },
        setActiveHub: (state, action: PayloadAction<number>) => {
            state.activeHub = action.payload
        },
        updateIsCreator: (state, action: PayloadAction<boolean>) => {
            state.isCreator = action.payload
        },

        updateIsActive: (state, action: PayloadAction<boolean>) => {
            state.isActive = action.payload
        },
        logout: (state) => {
            return initialState
        },
    },
});

export const { saveDetails, updateIsCreator, setActiveHub, updateIsActive } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
