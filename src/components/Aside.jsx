import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AiOutlineHome, AiOutlinePlusCircle } from "react-icons/ai";
import { MdCategory } from "react-icons/md";
import { BiErrorCircle } from "react-icons/bi";
import { FiInfo } from "react-icons/fi";
import { CgMenuRound } from "react-icons/cg";
import { useRef, useState } from "react";
import { FaTasks } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";



const Aside = () => {
      const [side, setSide] = useState(true)
      const sideMenu = useRef(null)
      function handleSideMenu () {
            side ? setSide(false) : setSide(true)
            sideMenu.current.classList.toggle('sm:w-[140px]')
      }

      return (
            <aside ref={sideMenu} className="aside w-[40px] sm:w-[140px] transition-all duration-300 ease-in-out h-screen bg-transparent py-4 flex gap-3.5 items-center  flex-col">
                  <div className="flex items-center gap-2  text-2xl font-bold">
                        <FaTasks className="text-blue-400" />
                  </div>
                  <CgMenuRound onClick={handleSideMenu} className="hidden sm:block text-xl cursor-pointer"/>
                  <ul className="space-y-4">
                        <li>
                        <Link to="/" className="flex items-center gap-2 text-white">
                        <AiOutlineHome className="text-blue-400"/>
                        <span className={side ? "hidden sm:block" : 'hidden'}>Home</span>
                        </Link>
                        </li>
                        <li>
                              <Link to="/categories" className="flex items-center gap-2 text-white">
                                    <MdAssignment className="text-yellow-400" />
                                    <span className={side ? "hidden sm:block" : 'hidden'}>Tasks</span>
                              </Link>
                        </li>
                        <li>
                              <Link to="/problems" className="flex items-center gap-2 text-white">
                                    <BiErrorCircle className="text-red-400"/>
                                    <span className={side ? "hidden sm:block" : 'hidden'}>Problems</span>
                              </Link>
                        </li>
                        <li>
                              <Link to="/addtask" className="flex items-center gap-2 text-white">
                                    <AiOutlinePlusCircle className="text-green-400"/>
                                    <span className={side ? "hidden sm:block" : 'hidden'}>Add Task</span>
                              </Link>
                        </li>
                        <li>
                              <Link to="/about" className="flex items-center gap-2 text-white">
                                    <FiInfo className="text-purple-400"/>
                                    <span className={side ? "hidden sm:block" : 'hidden'}>About</span>
                              </Link>
                        </li>
                  </ul>
            </aside>

      )
}

export default Aside;