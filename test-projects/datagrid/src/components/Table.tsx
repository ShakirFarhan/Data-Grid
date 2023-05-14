import { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CustomHeaderCell from './mini/CustomHeaderCell';
import './table.css';
import CustomCell from './mini/CustomCell';
import { columnInterface, rowType } from '../constants/interfaces';
import { DefaultRowData } from '../constants/data';
const Table = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const [rowData, setRowData] = useState<rowType[]>(DefaultRowData);

  const [columnDefs, setColumnDefs] = useState<columnInterface[]>([
    {
      id: 'id',
      headerName: 'Id',
      field: 'id',
      type: 'number',
      headerComponent: () => (
        <CustomHeaderCell
          label="Id"
          type="number"
          id="id"
          onColumnChange={handleEditCol}
        />
      ),
      headerClass: 'column-header',
    },
    {
      id: 'name',
      headerName: 'Name',
      field: 'name',
      type: 'string',
      headerComponent: () => (
        <CustomHeaderCell
          label="Name"
          type="string"
          id="name"
          onColumnChange={handleEditCol}
        />
      ),
      cellRendererFramework: CustomCell,
      cellRendererParams: (params: any) => ({
        onEdit: () => {
          params.api.startEditingCell({
            rowIndex: params.node.rowIndex,
            colKey: params.column.id,
          });
        },
        cellValue: params.value,
      }),
      headerClass: 'column-header',
    },
    {
      id: 'age',
      headerName: 'Age',
      field: 'age',
      type: 'number',
      headerClass: 'column-header',
      cellRendererFramework: CustomCell,
      cellRendererParams: (params: any) => ({
        onEdit: () => {
          params.api.startEditingCell({
            rowIndex: params.node.rowIndex,
            colKey: params.column.id,
          });
        },
        cellValue: params.value,
      }),
      headerComponent: () => (
        <CustomHeaderCell
          label="Age"
          type="number"
          id="age"
          onColumnChange={handleEditCol}
        />
      ),
    },
    {
      id: 'phone',
      headerName: 'phone',
      field: 'phone',
      type: 'number',
      headerClass: 'column-header',
      cellRendererFramework: CustomCell,
      cellRendererParams: (params: any) => ({
        onEdit: () => {
          params.api.startEditingCell({
            rowIndex: params.node.rowIndex,
            colKey: params.column.id,
          });
        },
        cellValue: params.value,
      }),
      headerComponent: () => (
        <CustomHeaderCell
          label="Phone"
          type="number"
          id="phone"
          onColumnChange={handleEditCol}
        />
      ),
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
  // const onEdit = () => {};

  
  const handleAddCol = () => {
    setColumnDefs((data) => {
      const updated = [
        ...data,
        {
          id: 'default',
          headerName: 'default',
          field: 'default',
          type: 'any',
          headerComponent: () => (
            <CustomHeaderCell
              label="Default"
              type="any"
              id="default"
              onColumnChange={handleEditCol}
            />
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



  const handleEditCol = (
    colId: string,
    newHeaderName: string,
    newFieldName: string,
    id: string,
  ) => {
    console.log(
      'cold id :' + id,
      ' New Header Name: ' + newHeaderName,
      ' New Field :' + newFieldName
    );
    const index = columnDefs.findIndex((col) => col.field === id);
    console.log('index :' + index);
    if (index !== -1) {
      setColumnDefs((prevColumnDefs) => {
        console.log({ prevColumnDefs })
        const updatedColumnDefs: any = [...prevColumnDefs];
        console.log({ updatedColumnDefs });
        updatedColumnDefs[index] = {
          ...updatedColumnDefs[index],
          id: id,
          headerName: newHeaderName,
          field: newFieldName,
          headerComponent: () => (
            <CustomHeaderCell
              label={newHeaderName}
              type={newFieldName}
              id={id}
              onColumnChange={handleEditCol}
            />
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
        };
        return updatedColumnDefs;
      });
    }

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
  // const handleEditCol = (
  //   colId: string,
  //   newHeaderName: string,
  //   newType: string
  // ) => {
  //   console.log(
  //     'cold id :' + colId,
  //     ' New Header Name: ' + newHeaderName,
  //     ' New Field :' + newType
  //   );
  //   console.log(columnDefs);

  //   const index = columnDefs.findIndex((col) => col.field === colId);
  //   console.log('index :' + index);
  //   if (index !== -1) {
  //     setColumnDefs((prevColumnDefs) => {
  //       const updatedColumnDefs: any = [...prevColumnDefs];

  //       updatedColumnDefs[index] = {
  //         ...updatedColumnDefs[index],
  //         headerName: newHeaderName,
  //         field: colId,
  //         type: newType,
  //         id: colId,
  //         headerComponent: () => (
  //           <CustomHeaderCell
  //             label={newHeaderName}
  //             type={newType}
  //             onColumnChange={handleEditCol}
  //           />
  //         ),
  //       };
  //       return updatedColumnDefs;
  //     });
  //   }
  // };

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
