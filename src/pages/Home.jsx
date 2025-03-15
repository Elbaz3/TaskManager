import { useSelector, useDispatch } from 'react-redux'
import Header from '../components/Header'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


const Home = () => {
  const [ quote, setQuote ] = useState('')
  const tasks = useSelector((state) => state.tasks.tasks) || []
  const username = useSelector((state) => state.tasks.userName) || ''
  const problems = useSelector((state) => state.tasks.problems) || []
  const solvedProblems = problems.length ? problems.filter((problem) => problem.solved === true) : []
  const totalProblems = problems.length - solvedProblems.length
  const status = useSelector((state) => state.tasks.status)
  const pStatus = useSelector((state) => state.tasks.pStatus)
  const completed = tasks.length ? tasks.filter((task) => task.status.toLowerCase() === 'done') : []
  const totalTasks = tasks.length
  const remainTasks = totalTasks - completed.length

  useEffect(() => {
    fetch("https://api.adviceslip.com/advice")
    .then(res => res.json())
    .then(data => setQuote(data));
  }, [])



return (
<section className="home relative w-full overflow-hidden h-screen">
  <Header />
  <div className="container flex flex-col gap-6 items-center relative h-full w-full max-w-none">
    <div className="section relative w-full overflow-hidden h-[50px] bg-blue-900/50 flex items-center">
      <div className="absolute scrollP max-w-[100%] flex ">
        <ul className=" gap-1.5 min-w-[100%] flex  flex-shrink-0 justify-between items-center">
          <li>🚀 Small steps every day lead to big results. Keep going!</li>
          <li>💪 Success is the sum of small efforts, repeated daily.</li>
          <li>✅ Stay productive! Track your tasks and manage deadlines effortlessly.</li>
          <li>📌 Don&apos;t forget to review your completed tasks for the week.</li>
          <li>⚡ New feature: Categorize your tasks for better organization.</li>
          <li>📈 Keep track of your progress and stay motivated!</li>
        </ul>
        <ul aria-hidden={true} className=" flex gap-1.5 min-w-[100%] flex-shrink-0 justify-between items-center">
        <li>🚀 Small steps every day lead to big results. Keep going!</li>
          <li>💪 Success is the sum of small efforts, repeated daily.</li>
          <li>✅ Stay productive! Track your tasks and manage deadlines effortlessly.</li>
          <li>📌 Don&apos;t forget to review your completed tasks for the week.</li>
          <li>⚡ New feature: Categorize your tasks for better organization.</li>
          <li>📈 Keep track of your progress and stay motivated!</li>
        </ul>
      </div>
    </div>
    <div className="welcom">
      <h1 className='text-3xl max-sm:text-[20px] w-full text-center'>{`Welcome back ${username} !`}</h1>
    </div>
    <div className="content flex flex-col items-center gap-6 sm:flex-row sm:justify-evenly w-full">
      <div className='flex flex-col gap-10'>
        <div className='flex flex-col gap-1 '>
          <h1>✅ Completed Tasks</h1>
          { status === 'loading' ? (<p>Loading...</p>) : totalTasks === 0 ? (<p className='text-[12px] w-full text-center'>no tasks yet<Link className=' text-yellow-500' to='/addtask' > add some </Link></p>) :(
            <div className=" ">
              {completed.map((task) =>  (
                  <div key={task.id} className='my-2 w-full bg-blue-600/20 text-green-500 rounded-2xl px-2 '>
                    <p>{task.title}</p>
                  </div>
                )
              )}
              <p className='text-[10px] text-gray-400 w-full text-end'>you have <Link to='/categories' className='text-yellow-500'>{remainTasks}</Link> tasks to complete</p>
            </div>
          )}
        </div>
        <div className='flex flex-col gap-1 '>
          <h1>🎯 Solved Problems</h1>
          { pStatus === 'loading' ? (<p>Loading...</p>) : solvedProblems.length === 0 ? (<p className='text-[12px] w-full text-center'>no problems solved yet<Link className=' text-yellow-500' to='/problems' > work on some </Link></p>) :(
            <div className=" ">
              {solvedProblems.map((problem) =>  (
                  <div key={problem.id} className='my-2 w-full bg-blue-600/20 text-green-500 rounded-2xl px-2 '>
                    <p>{problem.text}</p>
                  </div>
                )
              )}
              <p className='text-[10px] text-gray-400 w-full text-end'>you have <Link to='/problems' className='text-yellow-500'>{totalProblems}</Link> problems to solve</p>
            </div>
          )}
        </div>
      </div>
      <div className="quote relative px-2 w-64 py-5 border-2 border-blue-400 rounded-md flex flex-col gap-2">
        <span className='absolute top-1'>📌</span>
        <h1 className="text-center text-2xl text-blue-400">Quote</h1>
        <p className="text-center text-lg text-gray-400">{quote.slip?.advice}</p>
      </div>
    </div>
  </div>
</section>

  )
}

export default Home