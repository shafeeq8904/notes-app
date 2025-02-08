import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { PasswordInput } from '../components/PasswordInput'
import { validateEmail } from '../utils/helper'
import axiosInstance from '../utils/axiosInstance'

export const Login = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState(null);

  const navigate = useNavigate()

  const handleLogin = async (e)=>{
    e.preventDefault();
    if(!validateEmail(email)){
      setError('Please enter a valid email');
    }

    if(!password){
      setError('Please enter a password');
      return;
    }

    setError("")

    try {
      const response = await axiosInstance.post('/login',{
        email:email,
        password:password
      });

      if(response.data && response.data.accessToken){
        localStorage.setItem('token' , response.data.accessToken)
        navigate('/dashboard')
      }

    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
            setError("Email ID not found"); 
        } else if (error.response.status === 422) {
            setError("Incorrect password"); 
        } else {
            setError(error.response.data.message || "Something went wrong, please try again");
        }
    } else {
        setError("Something went wrong, please try again");
      }

    }
  }

  return (
    <>
      <Navbar/>

      <div className='flex items-center justify-center mt-20'>
        <div className='w-96 border rounded bg-white px-7 py-10 '>
          <form  onSubmit={handleLogin}>
            <h4 className='text-2xl mb-7'>Login</h4>
            <input 
              type='text' 
              placeholder='Email' 
              className='input-box'
              value={email}
              onChange={(e)=>setEmail(e.target.value)}

            />

            <PasswordInput
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

            {error && <p style={
              { color: "red",
                fontSize:"12px",
                marginLeft:"3px",
                marginBottom:"2px"
              }
             }>{error}</p>}


            <button type='submit' className='btn-primary'>
              Login
            </button>

            <p className='text-sm text-center mt-4'>Not registered yet? {""}
              <Link to='/sign-up' className='font-medium text-primary underline'>
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
