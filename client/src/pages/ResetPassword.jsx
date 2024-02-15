import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ResetPassword = () => {

  const { token } =  useParams()
  
  const [ password, setPassword ] = useState('')

  const navigate = useNavigate()

  axios.defaults.withCredentials = true;

  const submit = (e) =>{
    e.preventDefault()
    axios.post("https://mernpinauth.vercel.app/auth/reset-password/" + token , { password })
    .then(res => {
      console.log(res)
       if(res.data.status){
        navigate('/login')
       }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="flex bg-cover bg-[url('https://w.forfun.com/fetch/54/545a194f87e16829c052c12a3ffc4f3a.jpeg')] items-center justify-center h-screen bg-gray-200">
      <div className="p-6 m-3 bg-white rounded shadow-md w-96">
        <div className="mb-4">
          <img className="mx-auto w-[50px]" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png" alt="Logo" />
          <h2 className="text-2xl text-center">Create a New Password</h2>
          <p className="text-center text-gray-500 my-4"> Now you can create a new password this here </p>
        </div>
        <form onSubmit={submit}>
          <input onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-3 border rounded" type="password" placeholder="Password" />
          <button className="w-full p-2 mb-3 text-white bg-[red] rounded">Continue</button>

        </form>
      </div>
    </div>
  )
}

export default ResetPassword