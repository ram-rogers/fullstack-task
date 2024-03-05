import React from 'react'
import { Link } from 'react-router-dom'

const NoPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-8">Welcome to Our Website</h1>
            <div className="flex space-x-4">
                <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                    Login
                </Link>
                <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                    Register
                </Link>
            </div>
        </div>
    )
}

export default NoPage