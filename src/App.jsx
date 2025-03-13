import Aside from "./components/Aside"
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import Profile from './pages/Profile'
import Missing from './pages/Missing'
import Problems from './pages/Problems'
import Task from './pages/Task'
import Categories from './pages/Categories'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from "./pages/Home"
import About from "./pages/About"
import AddTask from './pages/AddTask'
import { fetchTasks, fetchProblems, fetchUsername } from "./StateSlices/tasksSlice" 
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase/firebase"
import { ToastContainer } from 'react-toastify';


const App = () => {
      const navigate = useNavigate()
      const location = useLocation()
      const signPages = [ '/login', '/signup' ]
      const isSignPages = signPages.includes(location.pathname)
      const dispatch = useDispatch()

      useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
          if (user) {
            if (location.pathname === '/login' || location.pathname === '/signup') {
              navigate('/');
            }
    
      
            dispatch(fetchTasks());    
            dispatch(fetchProblems()); 
            dispatch(fetchUsername()); 
          }
        });
      
        return () => unsub();
      }, [dispatch, navigate, location.pathname]); // Add dependencies to ensure effect runs on location change

    
  return (
    <>
    {isSignPages ? (
      <div className="bg-[#1E1E2E] text-amber-50">
      <ToastContainer />
      <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
      </Routes>
      </div>
    ) : (
      <div className="main">
            <ToastContainer />
            <Aside />
            <main className="bg-[#1E1E2E] flex flex-col flex-1/2">
             <Routes >
                <Route path="/" element={<Home />} />
                <Route path="/task" element={<Task />} />
                <Route path="/addtask" element={<AddTask />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/problems" element={<Problems />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<Missing />} />
            </Routes> 
            </main>
      </div>)}

    </>
  )
}

export default App