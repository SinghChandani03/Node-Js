import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import projectslice from '../slice/projectslice';
import authslice from '../slice/authslice';
import logger from 'redux-logger'; 

const store = configureStore({
  reducer: {
    auth: authslice,
    projects: projectslice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, logger) 
});

export default store;
