import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

const ListUsers = () => {
    const [data, setData] = useState([]);

    // useEffect(() => {
    //     fetchData();
    // }, []);

    // const fetchData = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:8080/admin/list-associates');
    //         setData(response.data);
    //         console.log(response.data)
    //     } catch (error) {
    //         console.error('Error fetching data: ', error);
    //     }
    // };

    const [columnDefs, setCoulmnDefs] = useState([
        { field: 'id' },
        { field: 'associateId' },
        { field: 'name' },
        { field: 'email' },
        { field: 'isRegistered' },
        { field: 'emailVerified' },
    ])

    const defaultColDef = useMemo(() => ({
        sortable: true,
        filter: true
    }), [])



    useEffect(() => {
        fetch("http://localhost:8080/admin/list-associates")
            .then(res => res.json())
            .then(rowData => setData(rowData))
    }, [])

    return (
        // <div className="container flex flex-col justify-center items-center px-4">
        //     <h2 className="text-xl font-semibold mb-4">List of Associates</h2>
        //     <div className="overflow-x-auto">
        //         <table className="table-auto border-collapse border">
        //             <thead>
        //                 <tr>
        //                     <th className="px-4 py-2 bg-gray-200 border">ID</th>
        //                     <th className="px-4 py-2 bg-gray-200 border">Associate Id</th>
        //                     <th className="px-4 py-2 bg-gray-200 border">Name</th>
        //                     <th className="px-4 py-2 bg-gray-200 border">Email</th>
        //                     <th className="px-4 py-2 bg-gray-200 border">Registered</th>
        //                     <th className="px-4 py-2 bg-gray-200 border">Verified</th>

        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {data.map(item => (
        //                     <tr key={item.id}>
        //                         <td className="px-4 py-2 border">{item.id}</td>
        //                         <td className="px-4 py-2 border">{item.associateId}</td>
        //                         <td className="px-4 py-2 border">{item.name}</td>

        //                         <td className="px-4 py-2 border">{item.email}</td>
        //                         <td className="px-4 py-2 border">{item.isRegistered}</td>

        //                         <td className="px-4 py-2 border">{item.emailVerified}</td>

        //                         {/* Add more table data cells as needed */}
        //                     </tr>
        //                 ))}
        //             </tbody>
        //         </table>
        //     </div>
        // </div>
        <div className="ag-theme-quartz-dark" style={{ width: '100%', height: 450 }}>
            <AgGridReact
                rowData={data}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
            />
        </div>
    );
};

export default ListUsers;
