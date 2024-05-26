import React, { useState, useEffect, useContext, useRef } from 'react'
import qs from 'qs'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice'
import { fetchPizzas } from '../redux/slices/pizzaSlice'
import { SearchContext } from '../App'
import { Categories, Pizza, Sort } from '../components'
import { sortList } from '../components/Sort/index'
import Loader from '../components/Pizzas/Loader'
import Paginate from '../components/Paginate/Paginate'

const Home = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const isSearch = useRef(false)
	const isMounted = useRef(false)
	const { items, status } = useSelector(state => state.pizza)
	const { categoryId, sort, currentPage } = useSelector(state => state.filter)

	const { searchValue } = useContext(SearchContext)
	// const [piza, setPizza] = useState([])
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
	console.log('Рендер Home')
	const onChangePage = number => {
		dispatch(setCurrentPage(number))
	}

	const getPizzas = async () => {
		console.log('Рендер Home 1')

		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const sortBy = sort.sortProperty.replace('-', '')
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
		const search = searchValue ? `&search=${searchValue}` : ''

		// OPTION 1
		// fetch(API_URL)
		// 	.then(response => response.json())
		// 	.then(piza => setPizza(piza))
		// 	.catch(error => setError(error.message))
		// 	.finally(() => setIsLoading(false))

		// OPTION 2
		// axios
		// 	.get(
		// 		`https://664b8e2535bbda10987d5fa1.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
		// 	)
		// 	.then(response => {
		// 		setPizza(response.data)
		// 		setIsLoading(false)
		// 	})
		// 	.catch(error => {
		// 		setIsLoading(false)
		// 	})

		// OPTION 2
		dispatch(
			fetchPizzas({
				currentPage,
				category,
				sortBy,
				order,
				search,
			}),
		)
		window.scrollTo(0, 0)
	}
	// Если изменили параметры и был первый рендер
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			})
			console.log('Если изменили параметры и был первый рендер')
			navigate(`?${queryString}`)
		}

		isMounted.current = true
	}, [categoryId, sort.sortProperty, currentPage])

	// Если был первый рендер, то проверяем Url-параметры и сохраняем в Redux
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1))
			const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)
			dispatch(
				setFilters({
					...params,
					sort,
				}),
			)
			console.log('Если был первый рендер, то проверяем Url-параметры и сохраняем в Redux')

			isSearch.current = true
		}
	}, [])

	// Если был перый рендер, то запрашиваем пиццы
	useEffect(() => {
		getPizzas()
		console.log('Если был перый рендер, то запрашиваем пиццы  ' + currentPage)
	}, [])

	const skeletons = [...new Array(8)].map((_, index) => <Loader key={index} />)
	const pizzas = items.map(pizza => <Pizza key={pizza.id} {...pizza} />)

	return (
		<div className="content">
			<div className="container">
				<div className="content__top">
					<Categories value={categoryId} onClickCategory={onChangeCategory} />
					<Sort />
				</div>
				<h2 className="content__title">Все пиццы</h2>
				<div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
				<div className="content__pagintaion">
					<Paginate currentPage={currentPage} onChangePage={onChangePage} />
				</div>
			</div>
		</div>
	)
}

export default Home
