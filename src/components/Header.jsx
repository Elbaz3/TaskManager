import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { auth, logOut } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const Header = () => {

      const dispatch = useDispatch()



        const showToast = (message, type) => {
          toast[type](message)
        }

      const [ user, setUser ] = useState(false)

      useEffect(() => {
            onAuthStateChanged(auth, async (user) => {
              if (user) {
                setUser(true)
              } else {
                setUser(false)
              }
            })
          }, [])

      function handleLogOut() {
            logOut(showToast)

      }


      return (
            <header className="w-full h-16 flex justify-between items-center
            p-2.5 bg-[#181825] text-[#E0DEF4]
            ">
                  <div className="nav w-full flex flex-row justify-between items-center">
                        <h1 className="text-2xl font-bold">Task Manager</h1>
                        {user ?
                              (<div className="signed flex gap-4 mr-6">
                                    <Link to="/profile" ><FaUserCircle className="text-gray-500 text-2xl" /></Link>
                                    <Link to='/login' onClick={handleLogOut} className='text-red-600'>Log Out</Link>
                              </div>
                              ) : (
                              <div className="sign flex gap-4 px-3 items-center">
                                    <Link to='/signup' className='custom-btn'>Sign Up</Link>
                                    <Link to='/login' className='custom-btn'>Log In</Link>
                              </div>)
                        }
                  </div>
            </header>
      )
}


export default Header;