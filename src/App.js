// import logo from '../public/assets/pizza-logo.svg'
import Categories from './components/Categories/Categories'
import Header from './components/Header/Header'
import Pizza from './components/Pizza/Pizza'
import './scss/app.scss'

function App() {
	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<div className='container'>
					<Categories />
					<h2 className='content__title'>Все пиццы</h2>
					<div className='content__items'>
						<Pizza />
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
