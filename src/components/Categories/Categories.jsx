import React from 'react'
import Sort from '../Sort/Sort'

const Categories = () => {
	return (
		<div className='content__top'>
			<div className='categories'>
				<ul>
					<li className='active'>Все</li>
					<li>Мясные</li>
					<li>Вегетарианская</li>
					<li>Гриль</li>
					<li>Острые</li>
					<li>Закрытые</li>
				</ul>
			</div>
			<Sort />
		</div>
	)
}

export default Categories
