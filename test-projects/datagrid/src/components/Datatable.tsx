import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

interface ColumnDefinition {
    headerName: string;
    field: string;
}

interface RowData {
    [key: string]: any;
}

const DataTable: React.FC = () => {
    const [columnDefs, setColumnDefs] = useState<ColumnDefinition[]>([
        { headerName: 'Name', field: 'name' },
        { headerName: 'Age', field: 'age' },
        { headerName: 'Email', field: 'email' },
    ]);

    const [rowData, setRowData] = useState<RowData[]>([
        { name: 'John Doe', age: 30, email: 'john.doe@example.com' },
        { name: 'Jane Smith', age: 25, email: 'jane.smith@example.com' },
        { name: 'Mike Johnson', age: 35, email: 'mike.johnson@example.com' },
    ]);

    const handleHeaderNameChange = (colId: string, newHeaderName: string) => {
        setColumnDefs((prevDefs) =>
            prevDefs.map((colDef) =>
                colDef.field === colId ? { ...colDef, headerName: newHeaderName } : colDef
            )
        );
    };

    const handleCellValueChanged = (params: any) => {
        const { colDef, data, newValue } = params;
        const { field } = colDef;
        setRowData((prevData) =>
            prevData.map((row) => (row === data ? { ...row, [field]: newValue } : row))
        );
    };

    const headerCellRenderer = (params: any) => {
        const { colDef } = params;
        const { headerName, field } = colDef;

        return (
            <CustomHeaderCell
                value={headerName}
                onHeaderNameChange={(newHeaderName) => handleHeaderNameChange(field, newHeaderName)}
            />
        );
    };

    return (
        <div className="ag-theme-alpine" style={{ height: '300px', width: '100%' }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                onCellValueChanged={handleCellValueChanged}
                frameworkComponents={{ headerCellRenderer }}
            />
        </div>
    );
};

interface CustomHeaderCellProps {
    value: string;
    onHeaderNameChange: (newHeaderName: string) => void;
}

const CustomHeaderCell: React.FC<CustomHeaderCellProps> = ({ value, onHeaderNameChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [headerName, setHeaderName] = useState(value);

    const handleHeaderNameClick = () => {
        setIsEditing(true);
    };

    const handleHeaderNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHeaderName(event.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
        onHeaderNameChange(headerName);
    };

    return isEditing ? (
        <input
            type="text"
            value={headerName}
            onChange={handleHeaderNameChange}
            onBlur={handleBlur}
            autoFocus
        />
    ) : (
        <div onClick={handleHeaderNameClick}>{value}</div>
    );
};

export default DataTable;
