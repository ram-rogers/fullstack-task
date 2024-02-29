import React, { useState } from 'react';
import * as XLSX from 'xlsx'; // Importing Excel library
import classNames from 'classnames'; // For conditional styling with Tailwind CSS

const AdminLogin = () => {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);

    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0];
        setFile(uploadedFile);

        // Parsing Excel file
        const reader = new FileReader();
        reader.onload = (event) => {
            const binaryString = event.target.result;
            const workbook = XLSX.read(binaryString, { type: 'binary' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            setData(parsedData);
        };
        reader.readAsBinaryString(uploadedFile);
    };

    return (
        <div className="container mx-auto p-4">
            <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                className="mb-4"
            />
            {file && (
                <div className="mb-4">
                    <h2 className="text-lg font-bold mb-2">Uploaded Data:</h2>
                    <table className="border-collapse border border-gray-400">
                        <tbody>
                            {data.map((row, rowIndex) => (
                                <tr key={rowIndex} className={classNames(rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white')}>
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex} className="border border-gray-400 px-4 py-2">
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminLogin;
