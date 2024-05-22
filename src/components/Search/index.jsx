import React, { useContext } from 'react'
import { SearchContext } from '../../App'
import styles from './Search.module.scss'

export const Search = () => {
	const { searchValue, setsearchValue } = useContext(SearchContext)
	return (
		<input
			value={searchValue}
			onChange={e => setsearchValue(e.target.value)}
			className={styles.root}
			placeholder='Поиск пиццы...'
		/>
	)
}
