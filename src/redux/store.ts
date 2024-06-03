import { configureStore } from '@reduxjs/toolkit'
import filterSlice from './slices/filterSlice'
import cartSlice from './slices/cartSlice'
import pizzaSlice from './slices/pizzaSlice'
import { useDispatch } from 'react-redux'

export const Store = configureStore({
	reducer: { filter: filterSlice, cart: cartSlice, pizza: pizzaSlice },
})

export type RootState = ReturnType<typeof Store.getState>

type AppDispatch = typeof Store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
