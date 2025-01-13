import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import React from 'react'
import authService from './appwrite/auth'
import { login, logout } from "./store/authSlice"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import { Outlet } from 'react-router-dom'


function App() {
  const [loading, setLoading] = useState(true)
  const dispach = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispach(login({ userData }))
        } else {
          dispach(logout())
        }
      })
      .finally(() => {
        setLoading(false)
      })

  }, [])

  return !loading ? <div className='bg-gray-400 min-h-screen flex flex-wrap content-between'>
    <main className=''>
      <Header />
      <Outlet/>
      {/* Outlet Here */}
      {/* // Todo : Add Outlet */}
      <Footer />
    </main>

  </div> : null

}

export default App
