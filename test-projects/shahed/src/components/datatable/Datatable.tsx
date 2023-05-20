import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './DataTable.css';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

type DataRow = string[];

type Header = {
    id: number;
    name: string;
};

const DataTable: React.FC = () => {
    const [headers, setHeaders] = useState<Header[]>([
        { id: 0, name: "ID" },
        { id: 1, name: "Column 1" },
        { id: 2, name: "Column 2" }
    ]);

    const [data, setData] = useState<DataRow[]>([
        ["1", 'Row 1 Data 1', 'Row 1 Data 2'],
        ["2", 'Row 2 Data 1', 'Row 2 Data 2'],
    ]);

    const [editableColumnIndex, setEditableColumnIndex] = useState<number | null>(null);

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

        if (headers.length === 1) {
            // If all columns are deleted, clear the data
            setData([]);
        } else {
            setData((prevData) =>
                prevData.map((row) => row.filter((_, colIndex) => colIndex !== header.id - 1))
            );
        }
    };

    const handleColumnClick = (index: number) => {
        setEditableColumnIndex(index);
    };

    const handleColumnBlur = () => {
        setEditableColumnIndex(null);
    };



    const popOverTrigger = () => {
        return (
            <Popover id={`popover-positioned-${'bottom'}`}>
                <Popover.Header as="h3">{`Popover ${'bottom'}`}</Popover.Header>
                <Popover.Body>
                    <strong>Holy guacamole!</strong> Check this info.
                </Popover.Body>
            </Popover>
        );
    }

    return (
        <div className="data-table">
            <div className="table-header d-flex align-items-end">
                {headers.map((header, index) => (
                    <div key={index} className="header-cell flex-grow-1" style={{ width: "250px" }}>
                        <div className="d-flex justify-content-between">
                            {editableColumnIndex === index ? (
                                <div
                                    contentEditable={index !== 0}
                                    onBlur={(e) => {
                                        if (index !== 0) {
                                            const value = e.target.textContent;
                                            updateHeader(index, value || "");
                                            handleColumnBlur();
                                        }

                                    }}
                                    autoFocus
                                >
                                    {header.name}
                                </div>
                            ) : (
                                <div
                                    onClick={() => handleColumnClick(index)}
                                    className="editable-column"
                                    contentEditable={index !== 0}
                                >
                                    {header.name}
                                </div>
                            )}
                            <div className="mx-2">
                                <FaMinusCircle onClick={() => handleDelete(header)} />
                            </div>
                        </div>
                    </div>
                ))}
                <div className="header-cell">
                    <FaPlusCircle onClick={addColumn} />
                </div>
            </div>
            <div className="table-body">
                {data.map((row, rowIndex) => (
                    <div key={rowIndex} className="table-row d-flex">
                        {row.map((cell, colIndex) => (
                            <div key={colIndex} className="table-cell border">
                                {colIndex !== 0 ? <input
                                    type="text"
                                    value={cell}
                                    onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                                /> : <input
                                    type="text"
                                    value={cell}
                                    disabled
                                />}

                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="table-footer">
                <div className="header-cell">
                    <FaPlusCircle onClick={addRow} />
                </div>
            </div>
        </div>
    );
};

export default DataTable;
