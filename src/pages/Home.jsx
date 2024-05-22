import React, { useState, useEffect } from 'react'
import { Categories, Pizza, Sort } from '../components'
import Loader from '../components/Pizzas/Loader'
import Paginate from '../components/Paginate/Paginate'

// const API_URL = ;

const Home = ({ searchValue }) => {
	const [piza, setPizza] = useState([])
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(true)
	const [categoryId, setCategoryId] = useState(0)
	const [currentPage, setcurrentPage] = useState(1)
	const [sortType, setSortType] = useState({
		name: 'популярности',
		sortProperty: 'rating',
	})

	const skeletons = [...new Array(8)].map((_, index) => <Loader key={index} />)

	const pizzas = piza.map(pizza => (
		<Pizza
			key={pizza.id}
			{...pizza}
		/>
	))

	useEffect(() => {
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const sort = sortType.sortProperty.replace('-', '')
		const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
		const search = searchValue ? `&search=${searchValue}` : ''

		setIsLoading(true)
		fetch(
			`https://664b8e2535bbda10987d5fa1.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort}&order=${order}${search}`
		)
			.then(response => response.json())
			.then(piza => setPizza(piza))
			.catch(error => setError(error.message))
			.finally(() => setIsLoading(false))
		// window.scrollTo(0, 0)
	}, [categoryId, sortType, searchValue, currentPage])

	if (error) {
		return <h1>Erorr: {error}</h1>
	}

	return (
		<div className='content'>
			<div className='container'>
				<div className='content__top'>
					<Categories
						value={categoryId}
						onClickCategory={id => {
							setCategoryId(id)
						}}
					/>
					<Sort
						value={sortType}
						onChangeSort={id => setSortType(id)}
					/>
				</div>
				<h2 className='content__title'>Все пиццы</h2>
				<div className='content__items'>{isLoading ? skeletons : pizzas}</div>
				<div className='content__pagintaion'>
					<Paginate
						onChangePage={number => {
							setcurrentPage(number)
						}}
					/>
				</div>
			</div>
		</div>
	)
}

export default Home
