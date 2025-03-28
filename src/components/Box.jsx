import { useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { fetchTasks, restStatus } from "../StateSlices/tasksSlice";
import { useDispatch } from "react-redux";
import { deleteTask, toNextCategory, toPreviousCategory, markDone } from "../firebase/firebase"; 
import { toast } from "react-toastify";

const Box = ({title, content, deadline, id, overlay, status, priority}) => {
      const menu = useRef(null)
      const dispatch = useDispatch()
      priority = priority.toLowerCase()
      const priorityColor = priority === 'low' ? 'bg-green-700/20 text-green-400' : priority === 'medium' ? 'bg-yellow-700/20 text-yellow-400' : 'bg-red-700/20 text-red-300'
      const ends = deadline.split('-').reverse().slice(0, 2).join('.')
      const showToast = (message, type = "success") => {
        if (toast[type]) {
          toast[type](message, { autoclose: 2000 });
        } else {
          toast(message, { autoclose: 2000 }); 
        }
      };
      function handleMenu () {
        menu.current.classList.toggle('hidden')
      }
      function handleDelete () {
        deleteTask(id, showToast)
        dispatch(fetchTasks());
      }
      function handlebuttons (e, taskid) {
          
        if (e.target === overlay.doneBtn.current) {
          markDone(id, showToast)
          dispatch(fetchTasks());
        } else if (e.target === overlay.deleteBtn.current) {
          handleDelete()
        }else if (e.target.closest('button') === overlay.nextBtn.current) {
          toNextCategory( taskid, status, showToast )
          dispatch(fetchTasks());
        }else if (e.target.closest('button') === overlay.previousBtn.current) {
          toPreviousCategory( taskid, status, showToast )
          dispatch(fetchTasks());

        }
      }
      function handleoverlay () {
        overlay.taskContent.current.textContent = content
        overlay.taskHead.current.textContent = title
        overlay.taskDeadline.current.textContent = deadline
        overlay.overlayBox.current.classList.remove('top-[-1000px]')
        overlay.overlayBox.current.removeEventListener('click', handlebuttons)
        const overlayClickHandler = (e) => handlebuttons(e, id);
        overlay.overlayBox.current.addEventListener("click", overlayClickHandler);
        function cleanup() {
          overlay.overlayBox.current.classList.add("top-[-1000px]");
          overlay.overlayBox.current.removeEventListener("click", overlayClickHandler);
      }
      overlay.closeBtn.current.addEventListener("click", cleanup);
      }

  return (
      <div className="box task-card w-full px-2.5 py-1 gap-2 bg-[#2A2D3E] rounded-xl">
      <div className={`bar relative flex flex-row items-center 
      justify-between text-[#E0DEF4]`}>
        <div className="star text-[10px] flex items-center justify-start">
        <p className="task-number p-1 bg-blue-700/20 text-blue-400 rounded-md">{ends}</p>
        <span className={`ml-1 p-1 rounded-md text-[10px] ${priorityColor}`} >{priority.charAt(0).toUpperCase() + priority.slice(1)}</span>
        </div>
        <BsThreeDots onClick={handleMenu} className="hover:bg-emerald-950 cursor-pointer
        rounded-full"/>
        <div ref={menu} className="menu text-[13px] text-red-600 absolute bg-white
        right-0 top-full mt-1.5 p-[2px] hidden">
            <span className="cursor-pointer" onClick={handleDelete}>delete</span>
        </div>
      </div>
      <h1 className="text-amber-50 pt-1">{title}</h1>
      <p className="text-[#939298] py-1 font-light text-sm cursor-pointer" onClick={handleoverlay}>
      {content?.length > 50 ? `${content.slice(0, 50)}...`: content}
      </p>
    </div>

  )
}

export default Box