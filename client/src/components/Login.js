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
    // console.log(formData)

    const [associateIdExists, setAssociateIdExists] = useState(false);
    const [isLoading, setIsLoading] = useState(false);



    const handleCheckAssociateId = async (e) => {

        e.preventDefault(e)
        setIsLoading(true)
        if (formData.associateId === "admin") {
            try {
                const response = await axios.get(`http://localhost:8080/admin/check/${formData.associateId}`);
                // console.log(formData.associateId)
                console.log(response)
                if (response.data.message === "User Found") {
                    toast.success("Admin Found")
                    setIsLoading(false)
                    setAssociateIdExists(true);

                } else {
                    setIsLoading(false)

                    setAssociateIdExists(false);
                    toast.error('Invalid associate ID');
                }
            } catch (error) {
                console.error('Error checking associate ID:', error);
                toast.error('An error occurred. Please try again.');
            }
        }

        else {
            try {
                const response = await axios.get(`http://localhost:8080/user/check/${formData.associateId}`);
                setIsLoading(true)
                console.log(formData.associateId)
                console.log(response)
                if (response.data.message === "User Found") {
                    toast.success("User Found")
                    setIsLoading(false)

                    setAssociateIdExists(true);
                } else if (response.data.message === "Your not registered. pls Register") {
                    setIsLoading(false)

                    setAssociateIdExists(false);
                    toast.error('Your not registered. pls Register');
                    setTimeout(() => {
                        navigate("/register");
                    }, 2000);
                }

            } catch (error) {
                console.error('Error checking associate ID:', error);
                toast.error('User Not Found in this Organization.');
            }

        }
    }


    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        if (formData.associateId === "admin") {
            try {
                const response = await axios.post('http://localhost:8080/admin/login', formData)
                    .then((res) => {
                        console.log(res.data);

                        if (res.data.message === "Email Not exists") {
                            setIsLoading(false)
                            toast.error("Email Not Exists")
                        }
                        else if (res.data.message === "Login Success") {
                            setIsLoading(false)
                            toast.success("Login Success ");
                            setTimeout(() => {
                                navigate("/admin");
                            }, 2000);

                        }
                        else {
                            toast.error("Incorrect Email or Password")
                            setIsLoading(false)

                        }
                    }, fail => console.error(fail))


            }
            catch (error) {
                toast.error('Login failed ' + error);
            }
        }

        else {
            try {
                const response = await axios.post('http://localhost:8080/user/login', formData)
                    .then((res) => {
                        console.log(res.data);

                        if (res.data.message === "You haven't Registered yet. please register.") {
                            setIsLoading(false)
                            toast.error("You haven't Registered yet. please register.")
                            setTimeout(() => {
                                navigate("/register");
                            }, 2000);

                        }
                        if (res.data.message === "Email Not exists") {
                            setIsLoading(false)
                            toast.error("Email Not Exists")
                        }
                        else if (res.data.message === "Login Success") {

                            setIsLoading(false)
                            toast.success("Login Success ");
                            setTimeout(() => {
                                navigate("/home");
                            }, 2000);
                        }
                        else {
                            setIsLoading(false)
                            toast.error(res.data.message)

                        }
                    }, fail => console.error(fail))

            }
            catch (error) {
                toast.error('Login failed ' + error);
            }

        }
    }






    return (
        <div className='flex justify-center items-center text-white bg-gray-900'>
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <ToastContainer position="top-center" autoClose={2000} />
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img className='h-full w-full' src="https://brandfetch.com/_next/image?url=https%3A%2F%2Fimages.prismic.io%2Fbrandfetch%2F0b02d32a-b7e8-4547-b52d-1274c5710171_cog_prim_lg_hrz_r_rgb_white_2022.png%3Fauto%3Dcompress%2Cformat&w=3840&q=75" alt="" />
                        <h2 className="mt-3 text-center text-3xl font-extrabold text-white-900">
                            Log in to your account
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleCheckAssociateId}>
                        <input type="hidden" name="remember" value="true" />
                        <div>
                            <label htmlFor="associateId" className="sr-only">Associate Id</label>
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
                                <button type="submit" disabled={isLoading} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    {isLoading ? 'Loading...' : 'Log In'}
                                </button>
                            </div>
                        </form>

                    )}
                    <div className="text-sm text-center mt-4">
                        Doesn't have an account? <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">Register here</a>
                    </div>
                </div>
            </div >
        </div>



    )
};

export default Login;
