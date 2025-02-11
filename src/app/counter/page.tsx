'use client'; // Ensure this is a client component

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { increment, decrement } from '../../store/slices/counterSlice';

export default function CounterPage() {
    const countValue = useSelector((state: RootState) => state.counter);

    const dispatch = useDispatch<AppDispatch>();

    return (
        <div className='text-black'>
            <h1>CounterValue: {countValue[0].value}</h1>
            <h1>CounterTotalValue: {countValue[0].valueTotal}</h1>

            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
        </div>
    );
}