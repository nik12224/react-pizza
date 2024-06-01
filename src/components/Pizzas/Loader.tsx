import React from 'react'
import ContentLoader from 'react-content-loader'

const Loader: React.FC = () => (
	<ContentLoader
		className="pizza-block"
		speed={2}
		width={280}
		height={460}
		viewBox="0 0 280 460"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb">
		<circle cx="130" cy="132" r="130" />
		<rect x="1" y="316" rx="0" ry="0" width="274" height="88" />
		<rect x="-3" y="275" rx="19" ry="19" width="281" height="25" />
		<rect x="3" y="416" rx="0" ry="0" width="90" height="27" />
		<rect x="125" y="412" rx="30" ry="30" width="152" height="45" />
	</ContentLoader>
)

export default Loader
