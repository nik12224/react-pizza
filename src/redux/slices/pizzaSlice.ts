import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'

type Pizza = {
	imageUrl: string
	title: string
	types: number[]
	sizes: number[]
	price: number
	rating: number
	id: string
}

export type SearchPizzaType = {
	currentPage: string
	category: string
	sortBy: string
	order: string
	search: string
}

export const fetchPizzaStatus = createAsyncThunk(
	'users/fetchPizzaStatus',
	async (params: SearchPizzaType) => {
		const { currentPage, category, sortBy, order, search } = params
		const API_URL = `https://664b8e2535bbda10987d5fa1.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`

		const { data } = await axios.get(API_URL)
		return data as Pizza[]
	},
)
enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}
interface PizzaSliceType {
	items: Pizza[]
	status: Status
}

const initialState: PizzaSliceType = {
	items: [],
	status: Status.LOADING,
}

export const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setPizza(state, action: PayloadAction<Pizza[]>) {
			state.items = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchPizzaStatus.pending, state => {
				state.status = Status.LOADING
				state.items = []
			})
			.addCase(fetchPizzaStatus.fulfilled, (state, action) => {
				state.items = action.payload
				state.status = Status.SUCCESS
			})
			.addCase(fetchPizzaStatus.rejected, state => {
				state.status = Status.ERROR
				state.items = []
			})
	},
})

export const selectPizza = (state: RootState) => state.pizza

export const { setPizza } = pizzaSlice.actions

export default pizzaSlice.reducer
