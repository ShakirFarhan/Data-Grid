import React, { useState } from 'react';
import HotTable from '@handsontable/react';
import './Main.css';
interface datatype {
  id?: number;
  name?: string;
  phone?: number;
}

const Main: React.FC = () => {
  const [tableData, setTableData] = useState<datatype[]>([
    {
      id: 1,
      name: 'Farhan',
      phone: 2345,
    },
    {
      id: 2,
      name: 'Shakir',
      phone: 886,
    },
    {
      id: 3,
      name: 'Jon',
      phone: 6545,
    },
  ]);
  const handleDataChange = (changes: any[], source: string) => {
    console.log(changes);
    if (source === 'edit') {
      const newData: datatype[] = [...tableData];
      changes.forEach(([row, prop, oldValue, newValue]) => {
        newData[row] = {
          ...newData[row],
          [prop]: newValue ?? null,
        };
      });
      setTableData(newData);
    }
  };
  console.log(tableData);
  const columnHeaders = (col: number) => {
    if (col === 0) {
      return `
      <div class="col-block">
      <h6 class="col-header">Column 1</h6>
 <span class="col-type">string</span>
      </div>`;
    } else if (col === 1) {
      return ` <div class="col-block">
      <h6 class="col-header">Column 1</h6>
 <span class="col-type">string</span>
      </div>`;
    } else {
      return ` <div class="col-block">
      <h6 class="col-header">Column 1</h6>
 <span class="col-type">string</span>
      </div>`;
    }
  };

  return (
    <HotTable
      data={tableData}
      stretchH="all"
      colHeaders={columnHeaders}
      // columns={columns}
      rowHeaders={false}
      // colHeaders={false}
      className="custom-table"
      afterChange={handleDataChange}
    />
  );
};

export default Main;
