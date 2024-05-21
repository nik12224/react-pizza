import React from 'react'
import { Categories, Pizzas } from '../components'

const Home = () => {
	return (
		<div className='content'>
			<div className='container'>
				<Categories />
				<h2 className='content__title'>Все пиццы</h2>
				<Pizzas />
			</div>
		</div>
	)
}

export default Home
