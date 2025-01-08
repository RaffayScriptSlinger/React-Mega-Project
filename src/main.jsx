import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from "./store/store.js"
import { Provider } from 'react-redux'
import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import Home from './components/pages/Home.jsx'
import Protected from './components/authLayout.jsx'
import { Login } from './components/index.js'

<BrowserRouter>
  <Routes>
    <Route path='/' element={Home} />
    <Route path='/Login' element={<Protected authentication={false}><Login /></Protected>} />
  </Routes>


</BrowserRouter>




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>

    </Provider>
  </StrictMode>,
)
