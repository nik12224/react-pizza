import React, { useEffect, useState } from 'react'
import { Pizza } from '../../components'
import Loader from './Loader'
const API_URL = 'https://664b8e2535bbda10987d5fa1.mockapi.io/items'

export const Pizzas = () => {
	const [piza, setPizza] = useState([])
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		fetch(API_URL)
			.then(response => response.json())
			.then(piza => setPizza(piza))
			.catch(error => setError(error.message))
			.finally(() => setIsLoading(false))
	}, [])

	if (error) {
		return <h1>Erorr: {error}</h1>
	}
	return (
		<div className='content__items'>
			{isLoading
				? [...new Array(8)].map((_, index) => <Loader key={index} />)
				: piza.map(pizza => {
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
