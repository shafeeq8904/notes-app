import './App.css'
import { Home } from './pages/Home'
import {BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    
    <Router>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar 
         toastStyle={{ fontSize: "12px", fontFamily: "Poppins, sans-serif", backgroundColor: "white", color: "black" ,borderRadius: "8px",boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)" }}
      />
      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/sign-up' element={<Signup/>} />
      </Routes>
    </Router>
  )
}

export default App;