import React from 'react'

export const Categories = ({ value, onClickCategory }) => {
	const categories = [
		'Все',
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые',
	]
	return (
		<div className='categories'>
			<ul>
				{categories.map((categoryName, index) => {
					return (
						<li
							onClick={() => {
								onClickCategory(index)
							}}
							className={value === index && 'active'}>
							{categoryName}
						</li>
					)
				})}
			</ul>
		</div>
	)
}
