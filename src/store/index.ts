import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default to localStorage for web
import counterReducer from './slices/counterSlice';
import usersDetailsSlice from './users-basic-details/usersDetailsSlice';
import linkInBioSlice from './link-in-bio/linkInBioSlice';


const rootReducer = combineReducers({
    counter: counterReducer,
    userDetails: usersDetailsSlice,
    linkInBio: linkInBioSlice,
});

// Persist configuration
const persistConfig = {
    key: 'root', // Key in storage
    storage, // Storage mechanism
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with the persisted reducer
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Required for redux-persist
        }),
});

// Persistor object
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
