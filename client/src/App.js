import React from 'react'
import Login from './components/Login'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './components/Home'
import AdminLogin from './components/AdminLogin'

const App = () => {
  return (
    <div className="App">
      <header className="App-header">

        <Router>
          <Routes>

            <Route path="login" element={<Login />} />
            {/* <Route path="register" element={<Register />} /> */}
            <Route path="/home" element={<Home />} />
            <Route path="/admin" element={<AdminLogin />} />

            {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
            {/* <Route path="/conform" element={<ConformOtp />} /> */}
            {/* <Route path="*" element={<NoPage />} /> */}
          </Routes>
        </Router>
      </header>
    </div>
  )
}

export default App