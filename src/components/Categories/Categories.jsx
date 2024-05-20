import React, { useState } from 'react'
import Sort from '../Sort/Sort'

const Categories = () => {
	const [activeIndex, setActiveIndex] = useState(0)

	const categories = [
		'Все',
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые',
	]
	return (
		<div className='content__top'>
			<div className='categories'>
				<ul>
					{categories.map((value, index) => {
						return (
							<li
								onClick={() => {
									setActiveIndex(index)
								}}
								className={activeIndex === index && 'active'}>
								{value}
							</li>
						)
					})}
				</ul>
			</div>
			<Sort />
		</div>
	)
}

export default Categories
