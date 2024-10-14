import React, { useState } from 'react'
import { message } from 'antd'
import CustomInput from '../../components/custom/CustomInput'
import CustomButton from '../../components/custom/CustomButton'
import { useLoginMutation } from '../../Redux/Api/authApi'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')

  const [loginMutation, { isLoading }] = useLoginMutation()

  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!mobile || !password) {
      message.error('Please fill in both fields.')
      return
    }

    try {
      const response = await loginMutation({ mobile, password })

      console.log(response, 'response')

      if (response?.error) {
        message.error('Login failed. Please check your credentials.')
      } else {
        message.success('Login successful!')
        localStorage.setItem('token_login', response?.data?.token)
        navigate('/dashboard')
      }
    } catch (err) {
      console.error('Login Error:', err)
      message.error('Something went wrong. Please try again later.')
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <div className="flex flex-col gap-3">
          <CustomInput
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            type="text"
          />
          <CustomInput
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <CustomButton
            button={isLoading ? 'Loading...' : 'Login'}
            onClick={handleLogin}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  )
}

export default Auth
