import { createContext, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import './scss/app.scss'

export const SearchContext = createContext()

function App() {
	const [searchValue, setsearchValue] = useState('')

	return (
		<BrowserRouter>
			<div className="wrapper">
				<SearchContext.Provider value={{ searchValue, setsearchValue }}>
					<Routes>
						<Route path="/react-pizza" element={<MainLayout />}>
							<Route path="/react-pizza" element={<Home />}></Route>
							<Route path="/react-pizza/cart" element={<Cart />}></Route>
							<Route path="*" element={<NotFound />}></Route>
						</Route>
					</Routes>
				</SearchContext.Provider>
			</div>
		</BrowserRouter>
	)
}

export default App
