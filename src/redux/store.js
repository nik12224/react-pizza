import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './slices/filterSlice'
import cartSlice from './slices/cartSlice'

export const Store = configureStore({
	reducer: { filter: filterSlice, cart: cartSlice },
})
