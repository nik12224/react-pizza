import React from 'react'

type CategoriesProps = {
	value: number
	onClickCategory: any
}

export const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
	const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
	return (
		<div className="categories">
			<ul>
				{categories.map((categoryName, index) => {
					return (
						<li
							onClick={() => {
								onClickCategory(index)
							}}
							className={value === index ? 'active' : undefined}>
							{categoryName}
						</li>
					)
				})}
			</ul>
		</div>
	)
}
