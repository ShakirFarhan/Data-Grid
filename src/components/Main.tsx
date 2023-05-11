import React, { useState } from 'react';
import HotTable from '@handsontable/react';
import './Main.css';
interface datatype {
  id?: number | string;
  name?: string;
  phone?: number | string;
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
  const [colHeader, setColHeaders] = useState([
    {
      title: 'Column 1',
      type: 'string',
      id: 'col1',
    },
    {
      title: 'Column 2',
      type: 'numeric',
      id: 'col2',
    },
    {
      title: 'Column 3',
      type: 'string',
      id: 'col3',
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
  const columnHeaders = (col: number) => {
    const headerHtml = colHeader
      .map((text, index) => {
        if (index === col) {
          return `
          <div class="col-block">
            <h6 class="col-header">${text.title}</h6>
            <span class="col-type">${text.type}</span>
          </div>
        `;
        } else {
          return '';
        }
      })
      .join('');

    return headerHtml;
  };
  const handleAddColumn = () => {
    const newColHeaders: {
      title: string;
      type: string;
      id: string;
    }[] = [...colHeader, { title: 'column3', type: '', id: '' }];
    setColHeaders(newColHeaders);
    setTableData([...tableData]);
  };
  const handleAddRule = () => {
    setTableData([...tableData, { id: '', name: '', phone: '' }]);
  };

  return (
    <>
      <HotTable
        data={tableData}
        stretchH="all"
        colHeaders={columnHeaders}
        rowHeaders={false}
        className="custom-table"
        afterChange={handleDataChange}
      />
      <button onClick={handleAddColumn} className="add">
        Add Column
      </button>
      <button onClick={handleAddRule} className="add">
        Add Rule
      </button>
    </>
  );
};

export default Main;
//
