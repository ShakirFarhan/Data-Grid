import React, { useState } from 'react';
import './DataTable.css';

type DataRow = string[];

const DataTable: React.FC = () => {
  const [headers, setHeaders] = useState<string[]>(['Column 1', 'Column 2']);
  const [data, setData] = useState<DataRow[]>([
    ['Row 1 Data 1', 'Row 1 Data 2'],
    ['Row 2 Data 1', 'Row 2 Data 2'],
  ]);

  const addRow = () => {
    setData((prevData) => [...prevData, Array(headers.length).fill('')]);
  };

  const addColumn = () => {
    const number = headers.length + 1;
    const newHeader = 'Column' + number;
    if (newHeader) {
      setHeaders((prevHeaders) => [...prevHeaders, newHeader]);
      setData((prevData) => prevData.map((row) => [...row, '']));
    }
  };

  const updateHeader = (index: number, value: string) => {
    setHeaders((prevHeaders) => {
      const newHeaders = [...prevHeaders];
      newHeaders[index] = value;
      return newHeaders;
    });
  };

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    setData((prevData) => {
      const newData: any = [...prevData];
      newData[rowIndex][colIndex] = value;
      return newData;
    });
  };

  return (
    <div className="data-table">
      <div className="table-header">
        {headers.map((header, index) => (
          <div key={index} className="header-cell">
            <input
              type="text"
              value={header}
              onChange={(e) => updateHeader(index, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="table-body">
        {data.map((row, rowIndex) => (
          <div key={rowIndex} className="table-row">
            {row.map((cell, colIndex) => (
              <div key={colIndex} className="table-cell">
                <input
                  type="text"
                  value={cell}
                  onChange={(e) =>
                    updateCell(rowIndex, colIndex, e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="table-footer">
        <button onClick={addRow}>Add Row</button>
      </div>
      <div className="header-cell">
        <button onClick={addColumn}>Add Column</button>
      </div>
    </div>
  );
};

export default DataTable;
