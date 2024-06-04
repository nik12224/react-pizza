import React, { memo } from 'react'

type CategoriesProps = {
	value: number
	onClickCategory: (id: number) => void
}
const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

export const Categories: React.FC<CategoriesProps> = memo(({ value, onClickCategory }) => {
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
})
