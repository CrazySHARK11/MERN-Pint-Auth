import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';

const Signup = () => {

  const [ username, setUserName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const navigate = useNavigate()

  axios.defaults.withCredentials = true;
  const submit = (e) =>{
    e.preventDefault()
    axios.post("https://mernpinauth.vercel.app/auth/signup", { username, email, password })
    .then(res => {
      if(res.data.status){
        toast(res.data.message + " You can login now")
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      }else{
        toast(res.data.message)
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="flex bg-cover bg-[url('https://w.forfun.com/fetch/54/545a194f87e16829c052c12a3ffc4f3a.jpeg')] items-center justify-center h-screen bg-gray-200">
   <Toaster />
    <div className="p-6 m-3 bg-white rounded shadow-md w-96 flex flex-col items-center">
      <div className="mb-4">
        <img className="mx-auto w-[50px]" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png" alt="Logo" />
        <h2 className="text-2xl text-center">Welcome to Pinterest</h2>
        <p className="text-center">Find new ideas to try</p>
      </div>
      <form onSubmit={submit} >
        <input required onChange={(e) => setUserName(e.target.value)} className="w-full p-2 mb-3 border rounded" type="text" placeholder="Username" />
        <input required onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mb-3 border rounded" type="email" placeholder="email@example.com" />
        <input required onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-3 border rounded" type="password" placeholder="Password" />
        <button className="w-full p-2 mb-3 text-white bg-[red] rounded">Continue</button>
      </form>
      <p className="text-xs text-center my-4">By continuing, you agree to Pinterest's Terms of Service, Privacy Policy</p>
      <p className="text-center mb-3">Already a member? <Link to="/login" className="text-[blue]">Log in</Link></p>
      <Link to="/forgotpassword" className="text-center text-white px-6 py-1 my-5 rounded-full bg-[blue] ">Forgot Password ?</Link> 
    </div>  
  </div>
  
  )
}

export default Signup