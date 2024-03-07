import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListUsers = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/admin/list-associates');
            setData(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    return (
        <div className="container flex flex-col justify-center items-center px-4">
            <h2 className="text-xl font-semibold mb-4">List of Associates</h2>
            <div className="overflow-x-auto">
                <table className="table-auto border-collapse border">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 bg-gray-200 border">ID</th>
                            <th className="px-4 py-2 bg-gray-200 border">Associate Id</th>
                            <th className="px-4 py-2 bg-gray-200 border">Name</th>
                            <th className="px-4 py-2 bg-gray-200 border">Email</th>
                            <th className="px-4 py-2 bg-gray-200 border">Registered</th>
                            <th className="px-4 py-2 bg-gray-200 border">Verified</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td className="px-4 py-2 border">{item.id}</td>
                                <td className="px-4 py-2 border">{item.associateId}</td>
                                <td className="px-4 py-2 border">{item.name}</td>

                                <td className="px-4 py-2 border">{item.email}</td>
                                <td className="px-4 py-2 border">{item.isRegistered}</td>

                                <td className="px-4 py-2 border">{item.emailVerified}</td>

                                {/* Add more table data cells as needed */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListUsers;
