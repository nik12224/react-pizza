import React, { useEffect, useRef } from 'react'
import qs from 'qs'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
	selectFilter,
	setCategoryId,
	setCurrentPage,
	setFilters,
} from '../redux/slices/filterSlice'
// import { SearchContext } from '../App'
import { fetchPizzaStatus, selectPizza } from '../redux/slices/pizzaSlice'
import { Categories, Pizza, Sort } from '../components'
import { sortList } from '../components/Sort/index'
import Loader from '../components/Pizzas/Loader'
import Paginate from '../components/Paginate/Paginate'

const Home: React.FC = () => {
	const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter)
	const { items, status } = useSelector(selectPizza)

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const isSearch = useRef(false)
	const isMounted = useRef(false)

	// const { searchValue } = useContext(SearchContext)
	// const [piza, setPizza] = useState([])
	// const [error, setError] = useState('')
	// const [isLoading, setIsLoading] = useState(true)
	// const [categoryId, setCategoryId] = useState(0)
	// const [currentPage, setcurrentPage] = useState(1)
	// const [sortType, setSortType] = useState({
	// 	name: 'популярности',
	// 	sortProperty: 'rating',
	// })

	const onChangeCategory = (id: number) => {
		dispatch(setCategoryId(id))
	}

	const onChangePage = (number: number) => {
		dispatch(setCurrentPage(number))
	}

	const getPizza = () => {
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const sortBy = sort.sortProperty.replace('-', '')
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
		const search = searchValue ? `&search=${searchValue}` : ''

		// const API_URL = `https://664b8e2535bbda10987d5fa1.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`

		// fetch(API_URL)
		// 	.then(response => response.json())
		// 	.then(piza => setPizza(piza))
		// 	.catch(error => setError(error.message))
		// 	.finally(() => setIsLoading(false))
		// const { data } = axios.get(API_URL)
		dispatch(
			// @ts-ignore
			fetchPizzaStatus({
				currentPage,
				category,
				sortBy,
				order,
				search,
			}),
		)
		window.scrollTo(0, 0)
	}

	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			})

			navigate(`?${queryString}`)
		}
		isMounted.current = true
	}, [categoryId, sort.sortProperty, currentPage, navigate])

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
			isSearch.current = true
		}
	}, [dispatch])

	useEffect(() => {
		window.scrollTo(0, 0)
		if (!isSearch.current) {
			getPizza()
		}

		isSearch.current = false
	}, [categoryId, sort.sortProperty, searchValue, currentPage])

	// if (error) {
	// 	return <h1>Erorr: {error}</h1>
	// }

	const skeletons = [...new Array(8)].map((_, index) => <Loader key={index} />)
	const pizzas = items.map((pizza: any) => <Pizza key={pizza.id} {...pizza} />)

	return (
		<div className="content">
			<div className="container">
				<div className="content__top">
					<Categories value={categoryId} onClickCategory={onChangeCategory} />
					<Sort />
				</div>
				<h2 className="content__title">Все пиццы</h2>
				{status === 'error' ? (
					<div className="content__error-info">
						<h2>Произошла ошибка 😕</h2>
						<p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
					</div>
				) : (
					<div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
				)}

				<div className="content__pagintaion">
					<Paginate currentPage={currentPage} onChangePage={onChangePage} />
				</div>
			</div>
		</div>
	)
}

export default Home
