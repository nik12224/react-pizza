import { Outlet } from 'react-router-dom'
import { Header } from '../components'

const MainLayout = ({ searchValue, setsearchValue }) => {
	return (
		<>
			<Header
				searchValue={searchValue}
				setsearchValue={setsearchValue}
			/>
			<Outlet />
		</>
	)
}

export default MainLayout
