import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CustomHeaderCell from './mini/CustomHeaderCell';
import './table.css';
interface rowType {
  id?: number | string;
  name?: string | number;
  age?: number | string;
  phone?: number | string;
}

const Table = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);

  const [rowData, setRowData] = useState<rowType[]>([
    {
      id: 1,
      name: 'Shakir Farhan',
      age: 18,
      phone: 88484,
    },
    {
      id: 2,
      name: 'John Doe',
      age: 21,
      phone: 24533,
    },
    {
      id: 3,
      name: 'Rock',
      age: 32,
      phone: 687647,
    },
  ]);

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: 'Id',
      field: 'id',
      type: 'number',
      headerComponent: () => <CustomHeaderCell label="Id" type="number" />,
    },
    {
      headerName: 'Name',
      field: 'name',
      type: 'string',
      headerComponent: () => <CustomHeaderCell label="Name" type="string" />,
    },
    {
      headerName: 'Age',
      field: 'age',
      type: 'number',
      headerComponent: () => <CustomHeaderCell label="Age" type="number" />,
    },
    {
      headerName: 'Phone',
      field: 'phone',
      type: 'number',
      headerComponent: () => <CustomHeaderCell label="Phone" type="number" />,
    },
  ]);
  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      flex: 1,
      filter: true,
      editable: true,
    }),
    []
  );
  const handleAddCol = () => {
    setColumnDefs((data) => {
      const updated = [
        ...data,
        {
          headerName: 'randome',
          field: 'random',
          type: 'string',
          headerComponent: () => (
            <CustomHeaderCell label="Random" type="string" />
          ),
        },
      ];
      return updated;
    });
  };
  const handleAddRule = () => {
    setRowData((data) => {
      const updated: rowType[] = [
        ...data,
        { id: '', age: '', name: '', phone: '' },
      ];
      return updated;
    });
  };

  return (
    <div style={containerStyle}>
      <div style={{ height: '100%', boxSizing: 'border-box' }}>
        <div
          style={{
            height: '240px',
            width: '100%',
            position: 'relative',
            zIndex: '1',
          }}
          className="grid-container"
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            className="ag-theme-alpine"
          />
        </div>
        <button onClick={handleAddRule}>Add Rule</button>
        <button onClick={handleAddCol}>Add Col</button>
      </div>
    </div>
  );
};
export default Table;
