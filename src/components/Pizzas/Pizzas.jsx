import React from 'react'
import Pizza from '../Pizza/Pizza'
import pizzaData from '../../data/Pizza.json'

const Pizzas = () => {
	return (
		<div className='content__items'>
			{pizzaData.map(pizza => {
				return (
					<Pizza
						key={pizza.id}
						{...pizza}
					/>
				)
			})}
		</div>
	)
}

export default Pizzas
