import React from 'react'
import Login from './components/Login'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './components/Home'
import AdminDashboard from './components/AdminDashboard'
import NoPage from './components/NoPage'
import Register from './components/Register'
import ForgotPassword from './components/ForgotPassword'
import ConfirmOtp from './components/ConfirmOtp'
import ListUsers from './ListUsers'

const App = () => {
  return (
    <div className="App">
      <header className="App-header">

        <Router>
          <Routes>

            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/admin" element={<AdminDashboard />} />

            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/conform" element={<ConfirmOtp />} />
            <Route path="/users" element={<ListUsers />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </Router>
      </header>
    </div>
  )
}

export default App