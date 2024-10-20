import React from 'react'
import ProfileInfo from './ProfileInfo'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate();

  const onLogout = ()=>{
    navigate('/login');
  }
  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow-md'> 
        <h2 className='text-xl font-medium text-slate-700 py-2'>Notes</h2>
        <ProfileInfo onLogout={onLogout}/>
    </div>
  )
}

export default Navbar