import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

const ForgotPassword = () => {

  const [email, setEmail] = useState('')

  axios.defaults.withCredentials = true;
  const submit = (e) => {
    e.preventDefault()
    axios.post("https://mernpinauth.vercel.app/auth/forgot-password", { email })
      .then(res => {
        toast(res.data.message)
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="flex bg-cover bg-[url('https://w.forfun.com/fetch/54/545a194f87e16829c052c12a3ffc4f3a.jpeg')] items-center justify-center h-screen bg-gray-200">
      <Toaster />
      <div className="p-6 m-3 bg-white rounded shadow-md w-96">
        <div className="mb-4">
          <img className="mx-auto w-[50px]" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png" alt="Logo" />
          <h2 className="text-2xl text-center">Forgot Password ?</h2>
          <p className="text-center text-gray-500 my-4">We will send you a password reseting link for that you have to Enter Your Email here</p>
        </div>
        <form onSubmit={submit}>
          <input className="w-full p-2 mb-3 border rounded" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" />
          <button className="w-full p-2 mb-3 text-white bg-[red] rounded">Continue</button>
        </form>
        <p className="text-xs text-center my-4">By continuing, you agree to Pinterest's Terms of Service, Privacy Policy</p>
        <p className="text-center mb-3">New to Pinterest? <Link to="/signup" className="text-[blue]">Signup</Link></p>
      </div>
    </div>
  )
}

export default ForgotPassword