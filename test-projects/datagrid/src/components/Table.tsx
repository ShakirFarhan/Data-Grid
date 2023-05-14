import { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CustomHeaderCell from './mini/CustomHeaderCell';
import './table.css';
import CustomCell from './mini/CustomCell';
import { columnInterface, rowType } from '../constants/interfaces';
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

  const [columnDefs, setColumnDefs] = useState<columnInterface[]>([
    {
      headerName: 'Id',
      field: 'id',
      type: 'number',
      headerComponent: () => <CustomHeaderCell label="Id" type="number" />,
      headerClass: 'column-header',
    },
    {
      headerName: 'Name',
      field: 'name',
      type: 'string',
      headerComponent: () => <CustomHeaderCell label="Name" type="string" />,
      cellRendererFramework: CustomCell,
      cellRendererParams: (params: any) => ({
        onEdit: () => {
          params.api.startEditingCell({
            rowIndex: params.node.rowIndex,
            colKey: params.column.colId,
          });
        },
        cellValue: params.value,
      }),
      headerClass: 'column-header',
    },
    {
      headerName: 'Age',
      field: 'age',
      type: 'number',
      headerClass: 'column-header',
      cellRendererFramework: CustomCell,
      cellRendererParams: (params: any) => ({
        onEdit: () => {
          params.api.startEditingCell({
            rowIndex: params.node.rowIndex,
            colKey: params.column.colId,
          });
        },
        cellValue: params.value,
      }),
      headerComponent: () => <CustomHeaderCell label="Age" type="number" />,
    },
    {
      headerName: 'Phone',
      field: 'phone',
      type: 'number',
      headerComponent: () => <CustomHeaderCell label="Phone" type="number" />,
      headerClass: 'column-header',
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
  const onEdit = () => {};
  const handleAddCol = () => {
    setColumnDefs((data) => {
      const updated = [
        ...data,
        {
          headerName: 'default',
          field: 'default',
          type: 'any',
          headerComponent: () => (
            <CustomHeaderCell label="Default" type="any" onEdit={onEdit} />
          ),
          cellRendererFramework: CustomCell,
          cellRendererParams: (params: any) => ({
            onEdit: () => {
              params.api.startEditingCell({
                rowIndex: params.node.rowIndex,
                colKey: params.column.colId,
              });
            },
            cellValue: params.value,
          }),
          headerClass: 'column-header',
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
  const handleCellValueChanged = (params: any) => {
    params.api.stopEditing();
  };

  return (
    <div style={containerStyle}>
      <div style={{ height: '100%', boxSizing: 'border-box' }}>
        <div className="grid-container">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            className="ag-theme-alpine"
            onCellValueChanged={handleCellValueChanged}
          />
        </div>
        <button onClick={handleAddRule}>Add Rule</button>
        <button onClick={handleAddCol}>Add Col</button>
      </div>
    </div>
  );
};
export default Table;
