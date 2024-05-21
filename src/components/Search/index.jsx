import React from 'react'
import styles from './Search.module.scss'

export const Search = ({ searchValue, setsearchValue }) => {
	return (
		<input
			value={searchValue}
			onChange={e => setsearchValue(e.target.value)}
			className={styles.root}
			placeholder='Поиск пиццы...'
		/>
	)
}
