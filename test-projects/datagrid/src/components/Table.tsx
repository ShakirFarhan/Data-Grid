import { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CustomHeaderCell from './mini/CustomHeaderCell';
import './table.css';
import CustomCell from './mini/CustomCell';
import { columnInterface } from '../constants/interfaces';
import uuid from 'react-uuid';
import { AiFillPlusCircle } from 'react-icons/ai';
import { useStore } from '../store';

const Table = () => {
  const { addRow, whenRowData, thenRowData } = useStore((store) => store);
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
          params.api.startEditingCell({
            rowIndex: params.node.rowIndex,
            colKey: params.column.colId,
          });
        },
        cellValue: params.value,
      }),
    },
  ]);

  const [whenColumnDefs, setWhenColumnDefs] = useState<columnInterface[]>([]);

  const defaultColDef = useMemo(
    () => ({
      // resizable: true,
      sortable: true,
      filter: true,
      editable: true,
      flex: 1,
    }),
    []
  );
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
    newFieldName: string
  ) => {
    if (colId) {
      setWhenColumnDefs((data: any) => {
        const updatedColumnDefs = [...data];
        const index = updatedColumnDefs.findIndex((col) => col.id === colId);
        if (index !== -1) {
          const existingCellRendererParams =
            updatedColumnDefs[index].cellRendererParams;
          updatedColumnDefs[index] = {
            ...updatedColumnDefs[index],
            headerName: newHeaderName,
            type: newFieldName,
            headerComponent: () => (
              <CustomHeaderCell
                label={newHeaderName}
                type={newFieldName}
                id={colId}
                userColumn={true}
                onColumnChange={handleEditCol}
                handlePin={handlePin}
              />
            ),
            cellRendererParams: (params: any) => ({
              ...existingCellRendererParams(params),
              onEdit: () => {
                params.api.startEditingCell({
                  rowIndex: params.node.rowIndex,
                  colKey: params.column.colId,
                });
              },
            }),
          };
        }

        return updatedColumnDefs;
      });
    }
  };

  const handleAddWhenCol = () => {
    setWhenColumnDefs((data: any) => {
      const newIndex = uuid();
      const updated = [
        ...data,
        {
          id: newIndex,
          headerName: '',
          field: newIndex,
          type: '',
          headerComponent: () => (
            <CustomHeaderCell
              label=""
              type=""
              id={newIndex}
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
            // onCellDoubleClicked={handleDoubleTap}
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
          />
        </div>
      </div>
      <button
        className="add-rule-btn"
        onClick={() => {
          addRow(whenColumnDefs, thenColumnDefs);
        }}
      >
        Add Rule
      </button>
    </div>
  );
};
export default Table;
