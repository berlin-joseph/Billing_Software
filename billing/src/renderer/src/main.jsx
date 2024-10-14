import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './Redux/Store'
import { BrowserRouter } from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
