import { configureStore } from '@reduxjs/toolkit'
import catBreedReducer from './cat-breed/cat-breed.slice'
import dropdownReducer from './dropdown/dropdown.slice'
import catReducer from './cat/cat.slice'

export const store = configureStore({
  reducer: {
    breeds: catBreedReducer,
    dropdown: dropdownReducer,
    cat: catReducer
  },
})

export type AppDispatch = typeof store.dispatch;
