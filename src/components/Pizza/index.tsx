import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CartItemType, addItem, selectCartItemById } from '../../redux/slices/cartSlice'

const typeNames = ['тонкое', 'традиционное']

type PizzaProps = {
	imageUrl: string
	title: string
	types: number[]
	sizes: number[]
	price: number
	rating: number
	id: string
}

export const Pizza = ({ imageUrl, title, types, sizes, price, rating, id }: PizzaProps) => {
	const dispatch = useDispatch()
	const cartItem = useSelector(selectCartItemById(id))
	const [sizePizza, setSizePizza] = useState<number>(0)
	const [typePizza, setTypePizza] = useState<number>(0)

	const addedCount = cartItem ? cartItem.count : 0

	const onClickAdd = () => {
		const item: CartItemType = {
			id,
			title,
			price,
			imageUrl,
			type: typeNames[typePizza],
			size: sizes[sizePizza],
			count: 0,
		}
		dispatch(addItem(item))
	}

	return (
		<div className="pizza">
			<div className="pizza-block">
				<img className="pizza-block__image" src={imageUrl} alt="Pizza" />
				<h4 className="pizza-block__title">{title}</h4>
				<div className="pizza-block__selector">
					<ul>
						{types.map(index => {
							return (
								<li
									onClick={() => setTypePizza(index)}
									className={typePizza === index ? 'active' : undefined}
									key={index}>
									{typeNames[index]}
								</li>
							)
						})}
					</ul>
					<ul>
						{sizes.map((size, index) => {
							return (
								<li
									onClick={() => setSizePizza(index)}
									className={sizePizza === index ? 'active' : undefined}
									key={index}>
									{size} см.
								</li>
							)
						})}
					</ul>
				</div>
				<div className="pizza-block__bottom">
					<div className="pizza-block__price">от {price} ₽</div>
					<div onClick={onClickAdd} className="button button--outline button--add">
						<svg
							width="12"
							height="12"
							viewBox="0 0 12 12"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
								fill="white"
							/>
						</svg>
						<span>Добавить</span>
						{addedCount > 0 && <i>{addedCount}</i>}
					</div>
				</div>
			</div>
		</div>
	)
}
