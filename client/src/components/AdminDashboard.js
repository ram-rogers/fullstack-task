import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import ListUsers from '../ListUsers';

const AdminDashboard = () => {
    const [file, setFile] = useState(null);

    const [activeComponent, setActiveComponent] = useState(false);

    const toggleUsers = () => {
        setActiveComponent(!activeComponent);
    };


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        // toast.info(`Selected file: ${e.target.files[0].name}`, {
        //     position: toast.POSITION.BOTTOM_CENTER
        // });
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error('Please select a file.');
            return;
        }

        if (!file.name.match(/\.(xlsx|xls)$/)) {
            toast.error('Please upload an Excel file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8080/admin/upload-associates-data', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setFile();
            setActiveComponent(true)
            console.log(response.data.Message)
            toast.success(response.data.Message);
        } catch (error) {
            toast.error('Error uploading file.');
            console.error('Error uploading file:', error);
        }
    };

    return (



        <div className="flex flex-col h-screen bg-gray-900">
            <header className="mb-8 font-bold flex flex-row justify-start items-center gap-4 text-white mt-5 ml-3" >
                <img className='h-9 w-9' src="https://img-c.udemycdn.com/organization_favicon/32x32/79488_3202.png" alt="" />
                Welcome Admin
            </header>
            <div className="flex-grow flex justify-center items-center ">
                <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 ">
                    <h2 className="text-2xl font-bold mb-6 text-center">Upload Excel File</h2>
                    <label htmlFor="file-upload" className="w-full cursor-pointer flex flex-col items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-lg py-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 1a1 1 0 0 1 .993.883L11 2v5h5a1 1 0 0 1 .117 1.993L16 9h-5v5a1 1 0 0 1-1.993.117L9 14V9H4a1 1 0 0 1-.117-1.993L4 7h5V2a1 1 0 0 1 1-1zm0 2H5v11h11V6h-6a1 1 0 0 1-.993-.883L10 5zm-2 8a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-lg">Select File</span>
                        <input id="file-upload" type="file" onChange={handleFileChange} className="sr-only" />
                    </label>
                    {file && <p className="mt-4 text-lg text-center">{file.name}</p>}
                    <button onClick={handleUpload} className="w-full mt-6 bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Upload</button>
                </div>


            </div>
            <button
                className="mt-8 mx-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={toggleUsers}
            >
                View Users
            </button>
            <div className="mt-8 mb-8">
                {activeComponent && <ListUsers />}

            </div>

            <Link
                to="/login"
                className="bg-red-500 text-white px-4 py-2 rounded absolute top-0 right-0 m-4"
            >
                Logout
            </Link>
            <ToastContainer />
        </div>
    );
};

export default AdminDashboard;
