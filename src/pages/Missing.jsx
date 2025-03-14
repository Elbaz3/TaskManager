import React from 'react'
import { Link } from 'react-router-dom'

const Missing = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <h1 className='text-4xl text-red-500'>404 Not Found</h1>
      <Link to='/' className='hover:text-green-500'>back to home page</Link>
    </div>
  )
}

export default Missing