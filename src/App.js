import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import './scss/app.scss'

function App() {
	const [searchValue, setsearchValue] = useState('')

	return (
		<BrowserRouter>
			<div className='wrapper'>
				<Routes>
					<Route
						path='/react-pizza'
						element={
							<MainLayout
								searchValue={searchValue}
								setsearchValue={setsearchValue}
							/>
						}>
						<Route
							path='/react-pizza'
							element={<Home searchValue={searchValue} />}></Route>
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
