import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const [user, setUser] = useState("")

  const navigate = useNavigate()

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:3000/auth/verify')
      .then(res => {
        if (res.data.status) {
          setUser(res.data.data)
        } else {
          navigate('/login')
          console.log(res.data)
        }
      })
  }, [])

  const logout = () => {
    const ask = confirm("ARE YOU SURE ?")
    if (ask === false) {
      console.log("asdad")
    } else {
      axios.get('http://localhost:3000/auth/logout')
        .then(res => {
          if (res.data.status) {
            window.location.reload()
          }
        }).catch(err => {
          console.log(err)
        })
    }
  }

 
  return (
    <div className=' pt-1 w-full h-screen bg-cover bg-[url("https://wallpapers.com/images/featured/black-wuuaobghtdllhliu.jpg")] '>

      {/* Header */}
      <header className="w-full mt-4 px-[5em]">
        <nav className="flex justify-between">
          <img className="w-[50px]" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png" alt="Logo" />
          <button onClick={logout} className="bg-[red] px-7 font-semibold rounded-lg text-white logout">LOGOUT</button>
        </nav>
      </header>

      {/* HOME */}
      <main className="flex justify-center">

        <div className="profile_segment flex flex-col items-center">
          <img className='w-32 rounded-lg' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />
          <p className='text-white font-semibold text-[4em]'> {user.username} </p>
        </div>

      </main>

    </div>
  )
}

export default Home