import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userDetailsInterface {
    email: string,
    firstName: string,
    lastName: string,
    isActive: boolean,
    isCreator: boolean,
    activeHub?: number,
}

const initialState: userDetailsInterface = {
    email: '',
    firstName: '',
    lastName: '',
    isActive: false,
    isCreator: true,
    activeHub: 0,
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
    },
});

export const { saveDetails, updateIsCreator, setActiveHub } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
