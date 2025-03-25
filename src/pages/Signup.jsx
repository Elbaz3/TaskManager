import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { signUP } from '../firebase/firebase'
import { toast } from 'react-toastify'


const NAME_REGEX = /^[\p{L}\p{M}]{3,12}$/u;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/

const Signup = () => {
  const [ firstName , setFirstName ] = useState('')
  const [ validFirstName, setValidFirstName ] = useState(false)
  const [ firstNameFocus, setFirstNameFocus ] = useState(false)
  const [ lastName , setLastName ] = useState('')
  const [ validLastName, setValidLastName ] = useState(false)
  const [ lastNameFocus,  setLastNameFocus] = useState(false)
  const [ email, setEmail ] = useState('')
  const [ validEmail, setValidEmail ] = useState(false)
  const [ emailFocus, setEmailFocus ] = useState(false)
  const [ password, setPassword ] = useState('')
  const [ validPassword, setValidPassword ] = useState(false)
  const [ passwordFocus, setPasswordFocus ] = useState(false)
  const [ confirmPassword, setConfirmPassword ] = useState('')
  const [ validConfirmPassword, setValidConfirmPassword ] = useState(false)
  const [ confirmPasswordFocus, setConfirmPasswordFocus ] = useState(false)
  
  const showToast = (message, type) => {
    toast[type](message, { autoClose: 1000 })
  }


  const userDetails = {
    firstName: firstName.trim(),
    lastName: lastName.trim()
  }

  async function handleSubmit (e) {
    e.preventDefault()
    if (!validFirstName || !validLastName || !validEmail || !validPassword || !validConfirmPassword) {
      showToast("Please fill the form correctly", "error")
      return
    }

    await signUP(email, password, userDetails, showToast)
  }

  useEffect(() => {
    if (NAME_REGEX.test(firstName)) {
      setValidFirstName(true)
    } else {
      setValidFirstName(false)
    }
  }, [firstName])
  useEffect(() => {
    if (NAME_REGEX.test(lastName)) {
      setValidLastName(true)
    } else {
      setValidLastName(false)
    }
  }, [lastName])
  useEffect(() => {
    if (EMAIL_REGEX.test(email)) {
      setValidEmail(true)
    } else {
      setValidEmail(false)
    }
  }, [email])
  useEffect(() => {
    if (PASSWORD_REGEX.test(password)) {
      setValidPassword(true)
    } else {
      setValidPassword(false)
    }
  }, [password])
  useEffect(() => {
    if (confirmPassword === password) {
      setValidConfirmPassword(true)
    } else {
      setValidConfirmPassword(false)
    }
  }, [confirmPassword, password])

  return (
    <div className='flex will-change-scroll h-screen items-center justify-center flex-col gap-6 '>
      <h1 className='text-4xl w-full max-w-[300px] bg-blue-700/20 p-2 rounded-sm text-center text-amber-50 font-bold'>Sign up</h1>
      <form onSubmit={handleSubmit} className='relative flex flex-col justify-start items-center gap-8 bg-blue-700/20 p-6 min-h-[300px] w-full max-w-[300px] rounded-sm'>
        <div className="relative name flex gap-5 ">
          <label className='sr-only' htmlFor="first-name">First Name</label>
            <div className=''>
              <input className={firstNameFocus && firstName && !validFirstName ? "inp-error" : "inp"}
                type="text"
                id='firstname'
                value={firstName}
                onChange={((e) => setFirstName(e.target.value))}
                aria-label='first-name'
                placeholder='First Name'
                autoComplete='off'
                onFocus={() => setFirstNameFocus(true)}
                onBlur={() => setFirstNameFocus(false)}
                required
              />
              <p id="uidnote" className={firstNameFocus && firstName && !validFirstName ? "err" : "offscreen"}>
                  4 to 12 characters Must be letters.
              </p>
            </div>
          <label className='sr-only' htmlFor="lastname">Last Name</label>
          <div>
            <input className={lastNameFocus && lastName && !validLastName ? "inp-error" : "inp"}
              type="text"
              id='lastname'
              value={lastName}
              onChange={((e) => setLastName(e.target.value))}
              aria-label='last-name'
              placeholder='Last Name'
              autoComplete='off'
              onFocus={() => setLastNameFocus(true)}
              onBlur={() => setLastNameFocus(false)}
              required
            />
            <p id="uidnote" className={lastNameFocus && lastName && !validLastName ? "err" : "offscreen"}>
                4 to 24 characters Must be letters.
            </p>
          </div>
        </div>
        <label htmlFor="email" className='sr-only'>Email</label>
        <div className='w-full relative'>
          <input className={emailFocus && email && !validEmail ? "inp-error" : "inp"}
            type="email"
            name='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            autoComplete='off'
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            required
          />
          <p id="uidnote" className={emailFocus && !validEmail && email ? "err" : "offscreen"}>
              Enter a valid email address.
          </p>
        </div>
        <label htmlFor="password" className='sr-only'>Password</label>
        <div className='w-full relative'>
          <input className={passwordFocus && password && !validPassword ? "inp-error" : "inp"}
            type="password"
            name='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            autoComplete='new-password'
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            required
          />
          <p id="uidnote" className={passwordFocus && !validPassword && password ? "err" : "offscreen"}>
            Must be 6-20 characters long with at least one uppercase letter, one lowercase, and one number.
          </p>
         </div>
        <label htmlFor="con-password" className='sr-only'>Password</label>
        <div className='w-full relative'>
        <input className={confirmPasswordFocus && confirmPassword && !validConfirmPassword ? "inp-error" : "inp"}
          type="password"
          name='con-password'
          id='con-password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder='Confirm Password'
          autoComplete='new-password'
          onFocus={() => setConfirmPasswordFocus(true)}
          onBlur={() => setConfirmPasswordFocus(false)}
          required
         />
         <p id="uidnote" className={confirmPasswordFocus && !validConfirmPassword && confirmPassword ? "err" : "offscreen"}>
                should match password
          </p>
         </div>
        <button className='sub-btn' type='submit'>Create Account</button>
        <Link className='transition-all delay-75 hover:text-green-400' to='/login' >Existing user?</Link>
      </form>

    </div>
  )
}

export default Signup