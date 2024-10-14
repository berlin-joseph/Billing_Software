import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/auth/Auth'
import Home from './pages/home/Home'
import { useVerifyTokenMutation } from './Redux/Api/authApi'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/" />
}

const App = () => {
  const token = localStorage.getItem('token_login')
  const [verifyToken, { isError, isLoading, isSuccess }] = useVerifyTokenMutation()
  const navigate = useNavigate()

  React.useEffect(() => {
    const checkToken = async () => {
      if (token) {
        try {
          const res = await verifyToken(token).unwrap()
          if (res.status === true && res.message === 'Token is valid') {
            navigate('/home')
          } else {
            console.error('Invalid token:', res.message)
            localStorage.removeItem('token_login') // Clear invalid token
          }
        } catch (error) {
          console.error('Token verification failed:', error)
          localStorage.removeItem('token_login') // Clear invalid token
        }
      } else {
        console.log('No token found')
      }
    }

    checkToken()
  }, [token, verifyToken, navigate])

  return (
    <>
      {isLoading ? (
        <h1 className="flex justify-center items-center h-screen">Loading...</h1>
      ) : (
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route
            path="/home"
            element={<ProtectedRoute element={<Home />} isAuthenticated={isSuccess} />}
          />
        </Routes>
      )}
      {isError && <div className="error-message">Failed to verify token. Please log in again.</div>}
    </>
  )
}

export default App
