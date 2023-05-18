import { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CustomHeaderCell from './mini/CustomHeaderCell';
import './table.css';
import CustomCell from './mini/CustomCell';
import { columnInterface, rowType } from '../constants/interfaces';
import { DefaultWhenRowData } from '../constants/data';
import { AiFillPlusCircle } from 'react-icons/ai';
const Table = () => {
  const [whenRowData, setWhenRowData] = useState<rowType[]>(DefaultWhenRowData);
  const [thenRowData, setThenRowData] = useState<any[]>([]);
  const [thenColumnDefs, setThenColumnDefs] = useState<any[]>([]);
  const [whenColumnDefs, setWhenColumnDefs] = useState<columnInterface[]>([
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
          userColumn={true}
          onColumnChange={handleEditCol}
          handlePin={handlePin}
        />
      ),
      headerClass: 'column-header',
      cellRendererFramework: CustomCell,
      cellRendererParams: (params: any) => ({
        onEdit: () => {
          console.log(params.node.rowIndex, params.column.colId);
          params.api.startEditingCell({
            rowIndex: params.node.rowIndex,
            colKey: params.column.colId,
          });
        },
        cellValue: params.value,
      }),
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
          userColumn={true}
          onColumnChange={handleEditCol}
          handlePin={handlePin}
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
            colKey: params.column.colId,
          });
        },
        cellValue: params.value,
      }),
      headerComponent: () => (
        <CustomHeaderCell
          label="Age"
          type="number"
          id="age"
          userColumn={true}
          onColumnChange={handleEditCol}
          handlePin={handlePin}
        />
      ),
    },
    {
      id: 'phone',
      headerName: 'phone',
      field: 'phone',
      type: 'number',
      headerClass: 'column-header',
      // pinned: 'left',
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
      headerComponent: () => (
        <CustomHeaderCell
          label="Phone"
          type="number"
          id="phone"
          userColumn={true}
          onColumnChange={handleEditCol}
          handlePin={handlePin}
        />
      ),
    },
  ]);
  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      filter: true,
      editable: true,
      flex: 1,
    }),
    []
  );

  const handleAddWhenCol = () => {
    setWhenColumnDefs((data) => {
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
              userColumn={true}
              onColumnChange={handleEditCol}
              handlePin={handlePin}
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
    id: string
  ) => {
    const index = whenColumnDefs.findIndex((col) => col.field === id);
    console.log('index :' + index);
    if (index !== -1) {
      setWhenColumnDefs((prevColumnDefs) => {
        console.log({ prevColumnDefs });
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
              userColumn={true}
              onColumnChange={handleEditCol}
              handlePin={handlePin}
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
  const handlePin = (id: string, pinned: boolean) => {
    if (!pinned) {
      const index = whenColumnDefs.findIndex((col) => col.field === id);
      setWhenColumnDefs((data) => {
        const updatedData: any = [...data];
        updatedData[index] = {
          ...updatedData[index],
          pinned: 'left',
        };
        return updatedData;
      });
    }
  };
  const handleAddRule = () => {
    setWhenRowData((data) => {
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
    <div className="table">
      <div className="scroll-wrapper">
        <div className="grid-block">
          <div className="when-btn-sec">
            <span>When</span>
            <AiFillPlusCircle onClick={handleAddWhenCol} className="plus-btn" />
          </div>
          <AgGridReact
            rowData={whenRowData}
            columnDefs={whenColumnDefs}
            defaultColDef={defaultColDef}
            className="ag-theme-alpine"
            onCellValueChanged={handleCellValueChanged}
          />
        </div>
        <div className="grid-block">
          <div className="when-btn-sec">
            <span>Then</span>
            <AiFillPlusCircle className="plus-btn" />
          </div>
          <AgGridReact
            rowData={thenRowData}
            columnDefs={thenColumnDefs}
            defaultColDef={defaultColDef}
            className="ag-theme-alpine"
            // onCellValueChanged={handleCellValueChanged}
          />
        </div>
      </div>
      <button className="add-rule-btn" onClick={handleAddRule}>
        Add Rule
      </button>
    </div>
  );
};
export default Table;
