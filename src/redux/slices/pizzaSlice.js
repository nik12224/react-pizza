import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzaStatus = createAsyncThunk(
	'users/fetchPizzaStatus',
	async (params, thunkApi) => {
		const { currentPage, category, sortBy, order, search } = params
		const API_URL = `https://664b8e2535bbda10987d5fa1.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`

		const { data } = await axios.get(API_URL)
		return data
	},
)

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
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchPizzaStatus.pending, state => {
				state.status = 'loading'
				state.items = []
			})
			.addCase(fetchPizzaStatus.fulfilled, (state, action) => {
				state.items = action.payload
				state.status = 'success'
			})
			.addCase(fetchPizzaStatus.rejected, state => {
				state.status = 'error'
				state.items = []
			})
	},
})

export const selectPizza = state => state.pizza

export const { setPizza } = pizzaSlice.actions

export default pizzaSlice.reducer
