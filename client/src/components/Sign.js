import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';

const Sign = () => {


    return (


        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 text-gray-100">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition duration-500">
                <img
                    className="mx-auto h-15 w-15"
                    src="https://brandfetch.com/_next/image?url=https%3A%2F%2Fimages.prismic.io%2Fbrandfetch%2F0b02d32a-b7e8-4547-b52d-1274c5710171_cog_prim_lg_hrz_r_rgb_white_2022.png%3Fauto%3Dcompress%2Cformat&w=3840&q=75"
                    alt="Workflow"
                />
                <div className="flex items-center justify-center gap-9">
                    <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                        Login
                    </Link>
                    <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                        Register
                    </Link>
                </div>
            </div>
        </div >



        // <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        //     <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition duration-500">
        //         <div>
        //             <img
        //                 className="mx-auto h-12 w-auto"
        //                 src="https://brandfetch.com/_next/image?url=https%3A%2F%2Fimages.prismic.io%2Fbrandfetch%2F0b02d32a-b7e8-4547-b52d-1274c5710171_cog_prim_lg_hrz_r_rgb_white_2022.png%3Fauto%3Dcompress%2Cformat&w=3840&q=75"
        //                 alt="Workflow"
        //             />
        //             <div className="flex space-x-4">
        //                 <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        //                     Login
        //                 </Link>
        //                 <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
        //                     Register
        //                 </Link>
        //             </div>
        //         </div>


        //     </div>
        // </div>
    );
};

export default Sign;
