import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice'
import { SearchContext } from '../App'
import { Categories, Pizza, Sort } from '../components'
import Loader from '../components/Pizzas/Loader'
import Paginate from '../components/Paginate/Paginate'

const Home = () => {
	const { categoryId, sort, currentPage } = useSelector(state => state.filter)

	const dispatch = useDispatch()

	const { searchValue } = useContext(SearchContext)
	const [piza, setPizza] = useState([])
	// const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(true)
	// const [categoryId, setCategoryId] = useState(0)
	// const [currentPage, setcurrentPage] = useState(1)
	// const [sortType, setSortType] = useState({
	// 	name: 'популярности',
	// 	sortProperty: 'rating',
	// })

	const onChangeCategory = id => {
		dispatch(setCategoryId(id))
	}

	const onChangePage = number => {
		dispatch(setCurrentPage(number))
	}

	const skeletons = [...new Array(8)].map((_, index) => <Loader key={index} />)

	const pizzas = piza.map(pizza => <Pizza key={pizza.id} {...pizza} />)

	useEffect(() => {
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const sortBy = sort.sortProperty.replace('-', '')
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
		const search = searchValue ? `&search=${searchValue}` : ''

		const API_URL = `https://664b8e2535bbda10987d5fa1.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`

		setIsLoading(true)
		// fetch(API_URL)
		// 	.then(response => response.json())
		// 	.then(piza => setPizza(piza))
		// 	.catch(error => setError(error.message))
		// 	.finally(() => setIsLoading(false))
		axios.get(API_URL).then(response => {
			setPizza(response.data)
			setIsLoading(false)
		})
		window.scrollTo(0, 0)
	}, [categoryId, sort.sortProperty, searchValue, currentPage])

	// if (error) {
	// 	return <h1>Erorr: {error}</h1>
	// }

	return (
		<div className="content">
			<div className="container">
				<div className="content__top">
					<Categories value={categoryId} onClickCategory={onChangeCategory} />
					<Sort />
				</div>
				<h2 className="content__title">Все пиццы</h2>
				<div className="content__items">{isLoading ? skeletons : pizzas}</div>
				<div className="content__pagintaion">
					<Paginate currentPage={currentPage} onChangePage={onChangePage} />
				</div>
			</div>
		</div>
	)
}

export default Home
