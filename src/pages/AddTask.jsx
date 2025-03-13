import { useState } from "react";
import { useDispatch } from 'react-redux';
import { fetchTasks, restStatus } from "../StateSlices/tasksSlice";
import { addTaskToFireStore, getTasks } from "../firebase/firebase";
import { toast } from "react-toastify";

const AddTask = () => {
  const [ title, setTitle ] = useState('')
  const [ content, setContent ] = useState('')
  const [ deadline, setDeadline ] = useState('')
  const [ status, setStatus ] = useState('to do')
  const [ priority, setPriority ] = useState('low')
  const dispatch = useDispatch()
  const showToast = (message, type = "success") => {
    if (toast[type]) {
      toast[type](message);
    } else {
      toast(message); 
    }
  };

  
  async function handleSubmit  (e) {
    e.preventDefault()
    const details = {
      title,
      deadline,
      status,
      priority,
      content
    }
    await addTaskToFireStore(details, showToast)
    dispatch(fetchTasks());
    setTitle('')
    setDeadline('')
    setStatus('')
    setContent('')
  }

  
  return (
    <section className="flex flex-col gap-6">
      <h1 className="w-full text-center pt-5 text-4xl text-yellow-500">Add Task</h1>
      <form id="additem" onSubmit={handleSubmit} className="flex flex-col gap-3.5 p-5 items-center">
            <label htmlFor="title">Task Title: </label>
            <input 
              id="title"
              type="text"
              value={title}
              placeholder="Task Title"
              onChange={(e) => setTitle(e.target.value)}
              required
              />
            <label htmlFor="content">Task content: </label>
            <input 
              id="content"
              type="text"
              value={content}
              placeholder="Task Content"
              onChange={(e) => setContent(e.target.value)}
              required
              />
            <label htmlFor="status">Status: </label>
            <select 
              id="status"
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              > 
              <option className="text-gray-300 bg-gray-800" value="To Do">To Do</option>
              <option className="text-blue-400 bg-gray-800" value="In Progress">In Progress</option>
              <option className="text-orange-400 bg-gray-800" value="Review">Review</option>
              <option className="text-green-400 bg-gray-800" value="Done">Done</option>
            </select>
            <label htmlFor="priority">Priority: </label>
            <select 
              id="priority"
              type="text"
              value={priority}
              placeholder="Priority"
              onChange={(e) => setPriority(e.target.value)}
              required
              > 
              <option className="text-green-400 bg-gray-800" value="Low">Low</option>
              <option className="text-yellow-400 bg-gray-800" value="Medium">Medium</option>
              <option className="text-red-500 bg-gray-800" value="High">High</option>
            </select>
            <label htmlFor="deadline">Deadline: </label>
            <input 
              id="deadline"
              type="date"
              value={deadline}
              placeholder="Deadline"
              onChange={(e) => setDeadline(e.target.value)}
              required
              />
              <button type="submit" className="px-8 py-1 bg-emerald-500 cursor-pointer
              text-gray-300 rounded-2xl hover:bg-yellow-500 hover:text-black"
              >Add</button>
      </form>
    </section>
  )
}

export default AddTask;