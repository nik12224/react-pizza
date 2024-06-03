import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export enum SortProperty {
	RATING_DESC = 'rating',
	TITLE_DESC = 'title',
	PRICE_DESC = 'price',
	RATING_ASC = '-rating',
	TITLE_ASC = '-title',
	PRICE_ASC = '-price',
}

export type SortType = {
	name: string
	sortProperty: SortProperty
}

export interface FilterSliceType {
	searchValue: string
	categoryId: number
	currentPage: number
	sort: SortType
}

const initialState: FilterSliceType = {
	searchValue: '',
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: 'популярности',
		sortProperty: SortProperty.PRICE_DESC,
	},
}

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload
		},
		setSort(state, action: PayloadAction<SortType>) {
			state.sort = action.payload
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
		setFilters(state, action: PayloadAction<FilterSliceType>) {
			state.sort = action.payload.sort
			state.currentPage = Number(action.payload.currentPage)
			state.categoryId = Number(action.payload.categoryId)
		},
	},
})

export const selectSort = (state: RootState) => state.filter.sort
export const selectFilter = (state: RootState) => state.filter

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } =
	filterSlice.actions

export default filterSlice.reducer
