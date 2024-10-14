import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Auth from './pages/auth/Auth'
import Home from './pages/home/Home'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />

        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
