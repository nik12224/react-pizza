import Categories from './components/Categories/Categories'
import Header from './components/Header/Header'
import Pizzas from './components/Pizzas/Pizzas'
import './scss/app.scss'

function App() {
	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<div className='container'>
					<Categories />
					<h2 className='content__title'>Все пиццы</h2>
					<Pizzas />
				</div>
			</div>
		</div>
	)
}

export default App
