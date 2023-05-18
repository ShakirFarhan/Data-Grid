import { useCallback, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CustomHeaderCell from './mini/CustomHeaderCell';
import './table.css';
import CustomCell from './mini/CustomCell';
import type { columnInterface, rowType } from '../constants/interfaces';
import { DefaultRowData } from '../constants/data';

const Table = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const [rowData, setRowData] = useState<rowType[]>(DefaultRowData);

  const [columnDefs, setColumnDefs] = useState<columnInterface[]>([
    {
      id: "1",
      headerName: 'Id',
      field: 'id',
      type: 'number',
      headerComponent: () => (
        <CustomHeaderCell
          label="Id"
          type="number"
          id="1"
          onColumnChange={handleEditCol}
        />
      ),
      cellRendererFramework: CustomCell,
      cellRendererParams: (params: any) => {
        return {
          onEdit: () => {
            params.api.startEditingCell({
              rowIndex: params.node.rowIndex,
              colKey: params.column.id,
            });
          },
          cellValue: params.value,
        }
      },
      headerClass: 'column-header',
    },
  ]);

  console.log({ columnDefs })


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
          id: `${columnDefs.length + 1}`,
          headerName: 'default',
          field: 'default',
          type: 'any',
          headerComponent: () => (
            <CustomHeaderCell
              label="Default"
              type="any"
              id={`${columnDefs.length + 1}`}
              onColumnChange={handleEditCol}
            />
          ),
          cellRendererFramework: CustomCell,
          cellRendererParams: (params: any) => {


            return {
              onEdit: () => {
                params.api.startEditingCell({
                  rowIndex: params.node.rowIndex,
                  colKey: params.column.id,
                });
              },
              cellValue: params.value,
            }
          },
          headerClass: 'column-header',
        },
      ];
      console.log({ updated })
      return updated;
    });
  };



  const handleEditCol = useCallback((
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
    console.log(columnDefs, id)
    const index = columnDefs.findIndex((col) => col.id === id);
    console.log('index :' + index);
    if (index !== -1) {
      setColumnDefs((prevColumnDefs) => {
        console.log({ prevColumnDefs })
        const updatedColumnDefs: any = [...columnDefs];
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
          cellRendererParams: (params: any) => {

            console.log({params})
            return {
              onEdit: () => {
                params.api.startEditingCell({
                  rowIndex: params.node.rowIndex,
                  colKey: params.column.id,
                });
              },
              cellValue: params.value,
            }
          },
          headerClass: 'column-header',
        };
        return updatedColumnDefs;
      });
    }

  }, [columnDefs]);

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
