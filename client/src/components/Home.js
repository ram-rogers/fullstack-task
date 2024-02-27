import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full bg-white p-8 shadow-md rounded-lg">
                <h2 className="text-3xl font-semibold text-gray-800 mb-4">Welcome to Our Website</h2>
                <p className="text-gray-600 mb-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, voluptatibus labore. Architecto, molestias, ea nostrum fugit dolorum autem voluptas soluta dolor ducimus dolores porro numquam ratione repellendus a facere harum, eius mollitia cupiditate alias quidem. Recusandae aliquid, nesciunt quisquam consequuntur deserunt animi illum dignissimos architecto, sunt fugiat excepturi atque. Doloribus!</p>
                <a href="#" className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-500 transition-colors duration-300">Get Started</a>
            </div>
            <Link
                to="/login"
                className="bg-red-500 text-white px-4 py-2 rounded absolute top-0 right-0 m-4"
            >
                Logout
            </Link>
        </div>
    )
}

export default Home