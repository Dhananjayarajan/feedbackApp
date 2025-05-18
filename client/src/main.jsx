import 'materialize-css/dist/css/materialize.min.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Provider} from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { thunk as reduxThunk } from 'redux-thunk'


import App from './components/App.jsx'
import reducers from './reducers'



const store = createStore(reducers, {},applyMiddleware(reduxThunk))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
 
  </StrictMode>,
)
