import React from 'react'
import ReactDOM from 'react-dom/client'
import { Store } from './redux/store'
import { Provider } from 'react-redux'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<Provider store={Store}>
		<App />
	</Provider>,
)
