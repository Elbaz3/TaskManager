import React from 'react'
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <section className='w-full h-full flex flex-col justify-center items-center'>
      <h1 className='text-3xl text-green-400'>Page Under Maintenance🛠️</h1>
      <Link to='/' className='text-yellow-400'>back to home</Link>
    </section>
  )
}

export default Profile;