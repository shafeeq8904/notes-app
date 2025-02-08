import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { PasswordInput } from '../components/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../utils/helper';
import axiosInstance from '../utils/axiosInstance';

export const Signup = () => {

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState(null);

  const navigate = useNavigate()

  const handleSignup = async (e)=>{
    e.preventDefault();

        if(!name){
          setError('Please enter a name');
          return;
        }

        if(!validateEmail(email)){
          setError('Please enter a valid email');
          return;
        }
    
        if(!password){
          setError('Please enter a password');
          return;
        }
    
        setError("")

        try {
          const response = await axiosInstance.post('/create-account',{
            fullName:name,
            email:email,
            password:password
          });

          if(response.data && response.data.error){
            setError('Error: ' + response.data.error)
            return
          }
    
          if(response.data && response.data.accessToken){
            localStorage.setItem('token' , response.data.accessToken)
            navigate('/login')
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
                <form  onSubmit={handleSignup}>
                  <h4 className='text-2xl mb-7'>Signup</h4>

                  <input 
                    type='text' 
                    placeholder='Name' 
                    className='input-box'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}

                  />

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
                        marginBottom:"3px",
                        fontFamily: "popins"
                      }
                    }>{error}</p>}


                    <button type='submit' className='btn-primary'>
                      Create Account
                    </button>

                    <p className='text-sm text-center mt-4'>Already have an account? {""}
                      <Link to='/login' className='font-medium text-primary underline'>
                        Login
                      </Link>
                    </p>


                </form>
              </div>
            </div>
    </>
  )
}
