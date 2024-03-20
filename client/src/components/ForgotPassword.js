import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const ForgotPassword = () => {

    const navigate = useNavigate();

    const [associateId, setAssociateId] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/user/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ associateId })
            })
            const data = await response.json();
            console.log(data)
            setIsLoading(false)

            if (data.message === "Error Happened") {
                toast.error("Something went Wrong. Try again later");
            }
            else if (data.message === "Mail Sent") {
                toast.success("Mail Sent Successfull")
                setTimeout(() => {
                    navigate("/conform", { state: { associateId: associateId } });
                }, 2000);
            }
        } catch (error) {
            toast.error('Error:', error);
        }

    };


    const handleChange = (e) => {
        console.log(e.target.value)
        setAssociateId(e.target.value);
    };


    return (
        <div className="min-h-screen flex items-center justify-center text-white bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">

            <ToastContainer position="top-center" autoClose={2000} />
            <div className="max-w-md w-full space-y-8">

                <div>
                    <img className='h-15 w-15' src="https://brandfetch.com/_next/image?url=https%3A%2F%2Fimages.prismic.io%2Fbrandfetch%2F0b02d32a-b7e8-4547-b52d-1274c5710171_cog_prim_lg_hrz_r_rgb_white_2022.png%3Fauto%3Dcompress%2Cformat&w=3840&q=75" alt="" />
                    <h2 className="mt-3 text-center text-3xl font-extrabold text-white-900">
                        Forgot Your Passowrd ?
                    </h2>
                </div>


                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="associateId" className="sr-only">Associate Id</label>
                            <input id="associateId" name="associateId" type="text" autoComplete="associateId" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Associate Id" value={associateId} onChange={handleChange} />
                        </div>

                    </div>

                    <div>
                        <button type="submit" disabled={isLoading} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            {isLoading ? 'Loading...' : 'Submit'}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default ForgotPassword