import { useCallback, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CustomHeaderCell from './mini/CustomHeaderCell';
import './table.css';
import CustomCell from './mini/CustomCell';
import { columnInterface, rowType } from '../constants/interfaces';

import { AiFillPlusCircle } from 'react-icons/ai';

const Table = () => {
  const [whenRowData, setWhenRowData] = useState<rowType[]>([]);
  const [thenRowData, setThenRowData] = useState<any[]>([]);
  const [thenColumnDefs, setThenColumnDefs] = useState<any[]>([
    {
      id: '1',
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
  ]);
  const [whenColumnDefs, setWhenColumnDefs] = useState<columnInterface[]>([
    {
      id: 'id',
      headerName: 'Id',
      field: 'id',
      type: 'number',
      disableColumnMenu: true,
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
      // resizable: true,
      sortable: true,
      filter: true,
      editable: true,
      flex: 1,
      enableValue: false,
      // allow every column to be grouped
      enableRowGroup: false,
      // allow every column to be pivoted
      enablePivot: false,
    }),
    []
  );
  const handleAddWhenCol = () => {
    setWhenColumnDefs([
      ...whenColumnDefs,
      {
        id: `default`,
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
              colKey: params.column.id,
            });
          },
          cellValue: params.value,
        }),
        headerClass: 'column-header',
      },
    ]);
  };
  const handleAddThenCol = () => {
    setThenColumnDefs([
      ...thenColumnDefs,
      {
        id: `default`,
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
              colKey: params.column.id,
            });
          },
          cellValue: params.value,
        }),
        headerClass: 'column-header',
      },
    ]);
  };

  const handleEditCol = (
    colId: string,
    newHeaderName: string,
    newFieldName: string,
    id: string
  ) => {
    console.log(
      'id :' + id,
      ' New Header Name: ' + newHeaderName,
      ' New Field :' + newFieldName
    );
    // console.log(whenColumnDefs, id);
    const index = whenColumnDefs.findIndex((col) => col.id === id);
    console.log('index :' + index);

    console.log(whenColumnDefs);
    if (index !== -1) {
      setWhenColumnDefs((prevColumnDefs) => {
        // console.log({ prevColumnDefs });
        const updatedColumnDefs: any = [...prevColumnDefs];
        // console.log({ updatedColumnDefs });
        updatedColumnDefs[index] = {
          ...updatedColumnDefs[index],
          id: id,
          headerName: newHeaderName,
          field: newFieldName,
          type: newFieldName,
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
          cellRendererParams: (params: any) => {
            console.log({ params });
            return {
              onEdit: () => {
                params.api.startEditingCell({
                  rowIndex: params.node.rowIndex,
                  colKey: params.column.id,
                });
              },
              cellValue: params.value,
            };
          },
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
        Object.fromEntries(whenColumnDefs.map((header) => [header.field, ''])),
      ];
      return updated;
    });
    setThenRowData((data) => {
      const updated: rowType[] = [
        Object.fromEntries(whenColumnDefs.map((header) => [header.field, ''])),
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
            <AiFillPlusCircle onClick={handleAddThenCol} className="plus-btn" />
          </div>
          <AgGridReact
            rowData={thenRowData}
            columnDefs={thenColumnDefs}
            defaultColDef={defaultColDef}
            className="ag-theme-alpine"
            onCellValueChanged={handleCellValueChanged}
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
