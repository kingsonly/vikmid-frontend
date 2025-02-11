import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
    value: number;
    valueTotal: number;
}

const initialState: CounterState[] = [
    {
        value: 0,
        valueTotal: 0,
    }
];

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state[0].value += 1;
            state[0].valueTotal += 2;
        },
        decrement: (state) => {
            state[0].value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state[0].value += action.payload;
        },
    },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
