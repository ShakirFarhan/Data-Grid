import React, { useState } from 'react';
import './DataTable.css';

type DataRow = string[];

type Header = {
    id: number;
    name: string;
};

const DataTable: React.FC = () => {
    const [headers, setHeaders] = useState<Header[]>([
        { id: 1, name: "Column 1" },
        { id: 2, name: "Column 2" }
    ]);
    const [data, setData] = useState<DataRow[]>([
        ['Row 1 Data 1', 'Row 1 Data 2'],
        ['Row 2 Data 1', 'Row 2 Data 2'],
    ]);

    const addRow = () => {
        setData((prevData) => [...prevData, Array(headers.length).fill('')]);
    };

    const addColumn = () => {
        const columnCount = headers.length + 1;
        const newHeader = "Column" + columnCount;
        const newColumn = {
            id: columnCount,
            name: newHeader
        };
        if (newHeader) {
            setHeaders((prevHeaders) => [...prevHeaders, newColumn]);
            setData((prevData) => prevData.map((row) => [...row, '']));
        }
    };

    const updateHeader = (index: number, value: string) => {
        setHeaders((prevHeaders) => {
            const newHeaders = [...prevHeaders];
            newHeaders[index].name = value;
            return newHeaders;
        });
    };

    const updateCell = (rowIndex: number, colIndex: number, value: string) => {
        setData((prevData) => {
            const newData = [...prevData];
            newData[rowIndex][colIndex] = value;
            return newData;
        });
    };

    const handleDelete = (header: Header) => {
        setHeaders((prevHeaders) => prevHeaders.filter((value) => value.id !== header.id));
        setData((prevData) => prevData.map((row) => row.filter((_, colIndex) => colIndex !== header.id - 1)));
    };

    return (
        <div className="data-table">
            <div className="table-header">
                {headers.map((header, index) => (
                    <div key={index} className="header-cell">
                        <div style={{ display: "flex" }}>
                            <input
                                type="text"
                                value={header.name}
                                onChange={(e) => updateHeader(index, e.target.value)}
                            />
                            <button onClick={() => handleDelete(header)}>Delete</button>
                        </div>
                    </div>
                ))}
                <div className="header-cell">
                    <button onClick={addColumn}>Add Column</button>
                </div>
            </div>
            <div className="table-body">
                {data.map((row, rowIndex) => (
                    <div key={rowIndex} className="table-row">
                        {row.map((cell, colIndex) => (
                            <div key={colIndex} className="table-cell">
                                <input
                                    type="text"
                                    value={cell}
                                    onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="table-footer">
                <button onClick={addRow}>Add Row</button>
            </div>
        </div>
    );
};

export default DataTable;
