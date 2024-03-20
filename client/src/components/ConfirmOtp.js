import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'

const ConfirmOtp = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const variable = location.state.associateId;
    console.log(variable)


    const [formData, setFormData] = useState({
        otp: '',
        associateId: variable,
        password: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/user/confirm-otp', formData).then((res) => {
                console.log(res.data.message);
                console.log(formData)
                if (res.data.message === "change success") {
                    toast.success("Password Changed Successfully")
                    setTimeout(() => {
                        navigate("/login");
                    }, 2000);
                }
                else if (res.data.message === "OTP Doesn't match") {
                    toast.error("OTP Doesn't match. Please enter the Correct OTP");
                }
                else if (res.data.message === "email Not found") {
                    toast.error("The Email id your entered doesn't exists");
                }
            }, fail => console.error(fail))



        } catch (error) {
            toast.error("Registration Failed " + error)
        }
        finally {
            setFormData({
                otp: '',
                associateId: '',
                password: ''
            });

        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center text-white bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <ToastContainer position="top-center" autoClose={2000} />

            <div className="max-w-md w-full space-y-8">

                <div>
                    <img className='h-15 w-15' src="https://brandfetch.com/_next/image?url=https%3A%2F%2Fimages.prismic.io%2Fbrandfetch%2F0b02d32a-b7e8-4547-b52d-1274c5710171_cog_prim_lg_hrz_r_rgb_white_2022.png%3Fauto%3Dcompress%2Cformat&w=3840&q=75" alt="" />
                    <h2 className="mt-3 text-center text-3xl font-extrabold text-white-900">
                        Reset Password
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="otp" className="sr-only">OTP</label>
                            <input id="otp" name="otp" type="text" autoComplete="otp" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Enter Otp" value={formData.otp} onChange={handleChange} />
                        </div>

                        <div>
                            <label htmlFor="associateId" className="sr-only">Associate Id</label>
                            <input id="associateId" name="associateId" type="hidden" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Associate Id" value={formData.associateId} onChange={handleChange} />
                        </div>


                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={formData.password} onChange={handleChange} />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Submit
                        </button>
                    </div>


                </form>

            </div>
        </div>
    )
}

export default ConfirmOtp;