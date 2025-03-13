import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../firebase/firebase'
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate()
  
  const showToast = (message, type) => {
    toast[type](message)
  }
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')


  async function handleLogin(e) {
    e.preventDefault()
    await login(email, password, showToast, navigate)
    
  }

  return (
    <div className='flex will-change-scroll h-screen items-center justify-center flex-col gap-6 '>
    <h1 className='text-4xl w-full max-w-[300px] bg-blue-700/20 p-2 rounded-sm text-center text-amber-50 font-bold'>Sign In</h1>
    <form onSubmit={handleLogin} className='flex flex-col justify-start items-center gap-8 bg-blue-700/20 p-6 min-h-[300px] w-full max-w-[300px] rounded-sm'>
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

       <button className='sub-btn' type='submit'>log in</button>
       <Link className='transition-all delay-75 hover:text-green-400' to='/signup' >No account yet?</Link>

    </form>

  </div>
  )
}

export default Login