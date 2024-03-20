import React from 'react'
import Login from './components/Login'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AdminDashboard from './components/AdminDashboard'
import NoPage from './components/NoPage'
import Register from './components/Register'
import ForgotPassword from './components/ForgotPassword'
import ConfirmOtp from './components/ConfirmOtp'
import ListUsers from './ListUsers'
import BlogPost from './components/BlogPost'
import Sign from './components/Sign'

const App = () => {
  return (
    <div className="App">
      <header className="App-header">

        <Router>
          <Routes>

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/sign" element={<Sign />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/home" element={<BlogPost />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/conform" element={<ConfirmOtp />} />
            <Route path="/users" element={<ListUsers />} />
            <Route path="*" element={<Sign />} />
          </Routes>
        </Router>
      </header>
    </div>
  )
}

export default App