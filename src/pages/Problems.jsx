import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addProblem, solvedProblem } from '../firebase/firebase'
import { fetchProblems, resetPstatus } from '../StateSlices/tasksSlice'
import Button from '../components/Button'
import { toast } from 'react-toastify'

const Problems = () => {
  const getProblems = useSelector((state) => state.tasks.problems) || []
  const problems = getProblems.filter((problem) => problem.solved === false) || []
  const pStatus = useSelector((state) => state.tasks.pStatus)
  const [ problem, setProblem ] = useState('')
  const dispatch = useDispatch()
  const showToast = (message, type = "success") => {
    if (toast[type]) {
      toast[type](message);
    } else {
      toast(message); 
    }
  };
  
  async function handleSubmit(e) {
    e.preventDefault()
    if (problem.length > 0) {
      await addProblem({ text: problem, solved: false}, showToast)
      setProblem('')
      dispatch(fetchProblems());
    }
  }

  function handleSolved(id) {
    solvedProblem(id, showToast)
    dispatch(fetchProblems());
  }

  return (
    <section className='flex flex-col gap-10 p-8 items-center'>
      <p className=' w-[90%] text-center text-xl text-[#F8C768] shadow-lg shadow-blue-500/60 px-4 py-2 rounded-lg'>
        Challenges are a natural part of life. 
        This is a place to help you list your problems, 
        giving you a clear view of what needs solving 
        so you can tackle them with focus and confidence.
      </p>
      {pStatus === 'loading' ? <p className="text-gray-400 text-center">Loading...</p> :
        <div className="w-full max-w-2xl">
          {problems.length > 0 ? (
            problems.map((problem) => (
              <div key={problem.id} className="flex gap-1 items-center justify-between bg-gray-800 text-white p-3 rounded-lg mb-2">
                <p className='flex-1/2'>{problem.text}</p>
                <Button onClick={() => handleSolved(problem.id)} content='Solved' color='green' />
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">No problems added yet.</p>
          )}
        </div>
      }
      <form onSubmit={handleSubmit} className="w-full max-w-2xl flex gap-2">
          <input 
            type="text" 
            className="w-full p-2 bg-gray-900 text-white rounded-lg"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Enter a new problem..."
          />
          <button type='submit' className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg">Add</button>
      </form>
    </section>
  )
}

export default Problems