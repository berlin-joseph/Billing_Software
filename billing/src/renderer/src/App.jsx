import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/auth/Auth'
import Home from './pages/home/Home'
import { useVerifyTokenMutation } from './Redux/Api/authApi'

const App = () => {
  const token = localStorage.getItem('token_login')
  const [verifyToken, { isError, isLoading, isSuccess }] = useVerifyTokenMutation()

  React.useEffect(() => {
    const checkToken = async () => {
      if (token) {
        try {
          await verifyToken({ token }).unwrap()
          console.log('Token is valid:', token)
        } catch (error) {
          console.error('Token verification failed:', error)
        }
      } else {
        console.log('No token found')
      }
    }

    checkToken()
  }, [token, verifyToken])

  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={isSuccess ? <Home /> : <Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
