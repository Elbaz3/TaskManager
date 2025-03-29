import Box from "../components/Box"
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/Button';
import { useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { Link } from 'react-router-dom'


 const Categories = () => {

  const tasks = useSelector((state) => state.tasks.tasks) || []
  const sortedTasks = tasks.length != 0 ? sortTasks() : []
  const status = useSelector((state) => state.tasks.status)
  const dispatch = useDispatch()
  const overlayBox = useRef(null)
  const taskContent = useRef(null)
  const taskDeadline = useRef(null)
  const taskHead = useRef(null)
  const doneBtn = useRef(null)
  const nextBtn = useRef(null)
  const previousBtn = useRef(null)
  const deleteBtn = useRef(null)
  const closeBtn = useRef(null)
  const overlay = {
    overlayBox,
    taskContent,
    taskDeadline,
    taskHead,
    doneBtn,
    nextBtn,
    deleteBtn,
    closeBtn,
    previousBtn
  }



  function sortTasks() {
    let high = []
    let medium = []
    let low = []
    tasks.forEach(task => {
      if (task.priority.toLowerCase() === 'high') {
        high.push(task)
      } else if (task.priority.toLowerCase() === 'medium') {
        medium.push(task)
      } else {
        low.push(task)
      }
    })
    return [...high, ...medium, ...low]
  }

  return (
     status === 'loading' ? (<h1 className="msg">Loading...</h1> )
     : status === 'failed' ? (<h1 className="msg">Error loading tasks</h1>)
     : !sortedTasks.length ? (<> <h1 className="msg">No Tasks Yet</h1> <Link className="text-blue-500 w-full text-center text-xl" to='/addtask'>go add some</Link> </>)
     :
    (<section className="">
      <h1 className="w-full text-center py-6 text-3xl text-blue-400">Tasks</h1>
      <div className="tasks grid grid-cols-1 sm:grid-cols-4 justify-items-center overflow-hidden">
        <div className="category max-h-full ">
          <div className="category-name text-[#F8C768]">To Do</div>
          <div className="boxs-container">
            {
              sortedTasks.map((task) => {
                if (task.status.toLowerCase() === 'to do') {
                  return( <Box  key={task.id} {...task} overlay={overlay} /> )
                }
              })
            }
          </div>
        </div>
        <div className="category ">
          <div className="category-name text-[#7DC4E4]">In Progress</div>
          <div className="boxs-container">
            {
              sortedTasks.map((task) => {
                if (task.status.toLowerCase() === 'in progress') {
                  return( <Box  key={task.id} {...task} overlay={overlay} /> )
                }
              })
            }
          </div>
        </div>
        <div className="category">
          <div className="category-name text-[#C084FC]">Review</div>
          <div className="boxs-container">
            {
              sortedTasks.map((task) => {
                if (task.status.toLowerCase() === 'review') {
                  return( <Box  key={task.id} {...task} overlay={overlay} /> )
                }
              })
            }
          </div>
        </div>
        <div className="category ">
          <div className="category-name text-[#A3E635]">Done</div>
          <div className="boxs-container">
            {
              sortedTasks.map((task) => {
                if (task.status.toLowerCase() === 'done') {
                  return( <Box key={task.id}  {...task} overlay={overlay}/> )
                }
              })
            }
          </div>
        </div>
        <div ref={overlayBox}  className="absolute w-screen h-screen inset-0 bg-[#00000080]
        flex justify-center items-center top-[-1000px] transition-all delay-150">
          <div className="over-box w-[70%] md:w-1/2 h-1/3 md:h-1/2 bg-[#121826] p-4 rounded-2xl
          flex flex-col gap-3.5 relative">
            <IoMdClose ref={closeBtn} className="absolute right-3 top-3 text-amber-50 text-2xl cursor-pointer hover:text-red-600" />
            <div className='head flex justify-between px-2 md:px-9 text-[#D1D5DB]'>
              <h2 ref={taskHead}></h2>
            </div>
            <div ref={taskContent} className="task-details px-2 md:px-9 text-[#FACC15] flex-1/2">
              <p></p>
            </div>
            <p className="w-full text-end text-[#EF4444] text-sm" >deadline: <span className="text-amber-50" ref={taskDeadline} ></span></p>
            <div className="actions px-1.5 flex gap-1 text-[8px] min-w-full md:px-9 md:gap-3 md:text-[10px]">
              <Button ref={doneBtn} content='mark as done' color="green" />
              <Button ref={previousBtn} color="gray" content={<GrLinkPrevious />} />
              <Button ref={nextBtn} color="gray" content={<GrLinkNext />} />
              <Button ref={deleteBtn} color="red" content='Delete' />
            </div>
          </div>
        </div>
      </div>
    </section>)
  
  )
}

export default Categories;
