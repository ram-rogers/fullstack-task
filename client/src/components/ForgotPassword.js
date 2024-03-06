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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

            <ToastContainer position="top-center" autoClose={2000} />
            <div className="max-w-md w-full space-y-8">

                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
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