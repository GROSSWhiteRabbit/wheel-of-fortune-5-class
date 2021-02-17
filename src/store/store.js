import {configureStore, combineReducers} from '@reduxjs/toolkit';
import main from '../reduser/main'

const allReduser = combineReducers({
    main
})


const store = configureStore({
    reducer: allReduser,
    devTools: true
})
console.log(store.getState(), 'getState');

export default store;