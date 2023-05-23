import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './DataTable.css';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';


// cell types
type DataRow = string[];


// header type
type Header = {
    id: number;
    name: string;
};

const DataTable2: React.FC = () => {

    // default header set
    const [headers, setHeaders] = useState<Header[]>([
        { id: 0, name: 'ID' },
        { id: 1, name: 'Column 1' },
        { id: 2, name: 'Column 2' }
    ]);

    // default data set
    const [data, setData] = useState<DataRow[]>([
        ['1', 'Row 1 Data 1', 'Row 1 Data 2'],
        ['2', 'Row 2 Data 1', 'Row 2 Data 2']
    ]);


    const types = [
        "string",
        "boolean",
        "number",
        "date",
        "time",
        "dateTime",
        "dayTimeDuration",
        "yearMonthDuration",
        "Any"
    ]

    // setting which column going to be editing
    const [editableColumnIndex, setEditableColumnIndex] = useState<number | null>(null);


    // adding new cell
    const addRow = () => {
        setData((prevData) => [...prevData, [(prevData.length + 1).toString(), '', '']]);
    };


    // adding new column
    const addColumn = () => {
        const columnCount = headers.length + 1;
        const newHeader = 'Column' + columnCount;
        const newColumn = {
            id: columnCount,
            name: newHeader
        };
        if (newHeader) {
            setHeaders((prevHeaders) => [...prevHeaders, newColumn]);
            setData((prevData) => prevData.map((row) => [...row, '']));
        }
    };


    // for updating cell data
    const updateCell = (rowIndex: number, colIndex: number, value: string) => {
        setData((prevData) => {
            const newData = [...prevData];
            newData[rowIndex][colIndex] = value;
            return newData;
        });
    };

    // for deleting column with row data
    const handleDelete = (header: Header) => {
        if (header.id === 0) {
            // Prevent deleting the ID column
            return;
        }



        // will store the index of the deleted header
        let columnIndex: any;

        setHeaders((prevHeaders) => prevHeaders.filter((value, index) => {

            if (value.id === header.id) {
                // storing the index of deleted header
                columnIndex = index;

            }
            return value.id !== header.id
        }));

        setData((prevData) => {
            // removing the row based on deleted header
            const newData = prevData.map((row) => row.filter((_, colIndex) => {
                return colIndex !== columnIndex
            }))

            return newData;
        }
        );
    };

    // handle header with double click
    const handleHeaderDoubleClick = (index: number) => {
        setEditableColumnIndex(index);
    };

    // for handling popover show or hide. not using just declared here
    const handlePopoverClose = (): void => {
        setEditableColumnIndex(null);
    };


    // for changing header
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const updatedHeaders = [...headers];
        updatedHeaders[editableColumnIndex!].name = value;
        setHeaders(updatedHeaders);
    };



    // for submit input value
    const handleInputSubmit = () => {
        setEditableColumnIndex(null);
    };


    return (
        <div className="data-table">
            {/* header section start */}
            <div className="table-header d-flex align-items-end">

                {/* list of headers are showing here */}
                {headers.map((header, index) => (
                    <div key={index} className="header-cell flex-grow-1" style={{ width: "250px" }}>

                        {/* using flex because we need to show delete button there. we will move it inside overlay trigger component */}
                        <div className='d-flex justify-content-between'>

                            {/* bootstrap component using for popover the options we need */}
                            <OverlayTrigger
                                trigger="click"
                                placement="bottom"
                                show={editableColumnIndex === index}
                                onToggle={handlePopoverClose}

                                overlay={
                                    <Popover id={`popover-${index}`} >
                                        <Popover.Body>
                                            <input
                                                type="text"
                                                value={header.name}
                                                onChange={handleInputChange}
                                                onBlur={handleInputSubmit}
                                                autoFocus
                                            />

                                            <div>Expression</div>
                                            <select name="" id="">

                                                {types && types.map((item: any, index: any) => {
                                                    return <option value="">{item}</option>
                                                })}
                                            </select>
                                        </Popover.Body>
                                    </Popover>
                                }
                            >
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent click event from propagating to OverlayTrigger
                                    }}
                                >
                                    {/* on double click the popover will occure */}
                                    <div
                                        className="editable-column"
                                        onDoubleClick={() => handleHeaderDoubleClick(index)}
                                    >
                                        {header.name}
                                    </div>
                                </div>
                            </OverlayTrigger>


                            {/* delete icon to delete columns */}
                            <div className="mx-2">
                                <FaMinusCircle onClick={() => handleDelete(header)} />
                            </div>
                        </div>

                    </div>
                ))}

                {/* add icon to add column on click */}
                <div className="header-cell">
                    <FaPlusCircle onClick={addColumn} />
                </div>
            </div>

            {/* cell section where data's will be shown based on column */}
            <div className="table-body">
                {data.map((row, rowIndex) => (
                    // looping row data here
                    <div key={rowIndex} className="table-row d-flex">
                        {row.map((cell, colIndex) => (
                            <div key={colIndex} className="table-cell border">
                                {colIndex !== 0 ? (
                                    // this portion is enabled for non-ID columns
                                    <input
                                        type="text"
                                        value={cell}
                                        onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                                    />
                                ) : (
                                    // this is for the ID column
                                    <input type="text" value={cell} readOnly />
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* another add icon to add row */}
            <div className="table-footer">
                <div className="header-cell">
                    <FaPlusCircle onClick={addRow} />
                </div>
            </div>
        </div>
    );
};

export default DataTable2;
