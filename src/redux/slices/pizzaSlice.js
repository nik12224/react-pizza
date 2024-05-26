import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async params => {
	const { currentPage, category, sortBy, order, search } = params

	const { data } = await axios.get(
		`https://664b8e2535bbda10987d5fa1.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
	)
	return data
})

const initialState = {
	items: [],
	status: 'loading',
}

export const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setPizza(state, action) {
			state.items = action.payload
			console.log(state.items)
		},
	},
	extraReducers: {
		[fetchPizzas.pending]: (state, action) => {
			state.status = 'loading'
			state.items = []
			console.log('Идет процесс')
		},
		[fetchPizzas.fulfilled]: (state, action) => {
			state.status = 'success'
			console.log('Все ок')
		},
		[fetchPizzas.rejected]: (state, action) => {
			console.log('Ошибочка')
			state.items = []
		},
	},
})

export const { setPizza } = pizzaSlice.actions

export default pizzaSlice.reducer
