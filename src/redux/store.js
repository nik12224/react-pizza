import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './slices/filterSlice'

export const Store = configureStore({
	reducer: { filter: filterSlice },
})
