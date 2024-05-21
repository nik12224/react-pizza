import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import { Categories, Header, Pizzas } from './components'
import Home from './pages/Home'
import MainLayout from './layouts/MainLayout'
import './scss/app.scss'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'

function App() {
	return (
		<BrowserRouter>
			<div className='wrapper'>
				<Routes>
					<Route
						path='/react-pizza'
						element={<MainLayout />}>
						<Route
							path='/react-pizza'
							element={<Home />}></Route>
						<Route
							path='/react-pizza/cart'
							element={<Cart />}></Route>
						<Route
							path='*'
							element={<NotFound />}></Route>
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App
