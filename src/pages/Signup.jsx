import {useState} from 'react'
import { Link } from 'react-router-dom'
import { signUP } from '../firebase/firebase'
import { toast } from 'react-toastify'

const Signup = () => {
  const [ firstName , setFirstName ] = useState('')
  const [ lastName , setLastNameName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ confirmPassword, setConfirmPassword ] = useState('')
  const showToast = (message, type) => {
    toast[type](message)
  }


  const userDetails = {
    firstName: firstName.trim(),
    lastName: lastName.trim()
  }

  async function handleSubmit (e) {
    e.preventDefault()
    await signUP(email, password, userDetails, showToast)
  }

  return (
    <div className='flex will-change-scroll h-screen items-center justify-center flex-col gap-6 '>
      <h1 className='text-4xl w-full max-w-[300px] bg-blue-700/20 p-2 rounded-sm text-center text-amber-50 font-bold'>Sign up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col justify-start items-center gap-8 bg-blue-700/20 p-6 min-h-[300px] w-full max-w-[300px] rounded-sm'>
        <div className="name flex gap-5 ">
          <label className='sr-only' htmlFor="first-name">First Name</label>
            <input className='inp'
              type="text"
              id='firstname'
              value={firstName}
              onChange={((e) => setFirstName(e.target.value))}
              aria-label='first-name'
              placeholder='First Name'
              autoComplete='off'
              required
            />
          <label className='sr-only' htmlFor="lastname">Last Name</label>
            <input className='inp'
              type="text"
              id='lastname'
              value={lastName}
              onChange={((e) => setLastNameName(e.target.value))}
              aria-label='last-name'
              placeholder='Last Name'
              autoComplete='off'
              required
            />
        </div>
        <label htmlFor="email" className='sr-only'>Email</label>
        <input className='inp'
          type="email"
          name='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          autoComplete='off'
          required
         />
        <label htmlFor="password" className='sr-only'>Password</label>
        <input className='inp'
          type="password"
          name='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          autoComplete='new-password'
          required
         />
        <label htmlFor="con-password" className='sr-only'>Password</label>
        <input className='inp'
          type="password"
          name='con-password'
          id='con-password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder='Confirm Password'
          autoComplete='new-password'
          required
         />
        <button className='sub-btn' type='submit'>Create Account</button>
        <Link className='transition-all delay-75 hover:text-green-400' to='/login' >Existing user?</Link>
      </form>

    </div>
  )
}

export default Signup