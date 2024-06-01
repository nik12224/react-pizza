import React from 'react'
import ReactPaginate from 'react-paginate'
import styles from './Paginate.module.scss'

type PaginateProps = {
	onChangePage: (page: number) => void
	currentPage: number
}

const Paginate: React.FC<PaginateProps> = ({ onChangePage, currentPage }) => {
	return (
		<ReactPaginate
			className={styles.root}
			breakLabel="..."
			nextLabel=">"
			onPageChange={e => onChangePage(e.selected + 1)}
			pageRangeDisplayed={4}
			pageCount={3}
			forcePage={currentPage - 1}
			previousLabel="<"
			renderOnZeroPageCount={null}
		/>
	)
}

export default Paginate
