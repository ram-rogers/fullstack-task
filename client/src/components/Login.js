import React, { useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        associateId: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    console.log(formData)

    const [associateIdExists, setAssociateIdExists] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleCheckAssociateId = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/user/${formData.associateId}`);
            console.log(formData.associateId)
            console.log(response)
            if (response?.data) {
                toast.success("User Found")
                setAssociateIdExists(true);
                setErrorMessage('');
            } else {
                setAssociateIdExists(false);
                setErrorMessage('Invalid associate ID');
                toast.error('Invalid associate ID');
            }
        } catch (error) {
            console.error('Error checking associate ID:', error);
            toast.error('An error occurred. Please try again.');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (formData.associateId === "admin") {
                const response = await axios.post('http://localhost:8080/admin/login', formData)
                    .then((res) => {
                        console.log(res.data);

                        if (res.data.message === "Email Not exists") {
                            toast.error("Email Not Exists")
                        }
                        else if (res.data.message === "Login Success") {
                            toast.success("Login Success ");
                            setTimeout(() => {
                                navigate("/admin");
                            }, 2000);
                        }
                        else {
                            toast.error("Incorrect Email or Password")
                        }
                    }, fail => console.error(fail))
            }
            else {


                const response = await axios.post('http://localhost:8080/login', formData)
                    .then((res) => {
                        console.log(res.data);

                        if (res.data.message === "Email Not exists") {
                            toast.error("Email Not Exists")
                        }
                        else if (res.data.message === "Login Success") {
                            toast.success("Login Success ");
                            setTimeout(() => {
                                navigate("/home");
                            }, 2000);
                        }
                        else {
                            toast.error("Incorrect Email or Password")
                        }
                    }, fail => console.error(fail))

            }
        } catch (error) {
            toast.error('Login failed ' + error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <ToastContainer position="top-center" autoClose={2000} />
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Log in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleCheckAssociateId}>
                    <input type="hidden" name="remember" value="true" />
                    <div>
                        <label htmlFor="associateId" className="sr-only">Email</label>
                        <input type="text"
                            id="associateId"
                            name="associateId"
                            required
                            className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Associate Id"
                            value={formData.associateId}
                            onChange={handleChange} />
                    </div>
                    {associateIdExists ? "" : (
                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Log in
                            </button>
                        </div>
                    )
                    }
                </form>
                {!associateIdExists ? "" : (
                    <form onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange} />
                        </div>

                        <div className="flex items-center justify-between mt-5">
                            <div className="text-sm">
                                <a href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Log in
                            </button>
                        </div>
                    </form>
                )}

            </div>
        </div >



    )
};

export default Login;
