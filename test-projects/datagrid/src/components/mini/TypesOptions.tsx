import React, { useState } from 'react';
import { types } from '../../constants/types';
interface defaultProps {
  type: string;
  column: string;
  onColumnChange: (
    colId: string,
    newHeaderName: string,
    newFieldName: string
  ) => void;
}
const TypesOptions: React.FC<defaultProps> = ({
  type,
  column,
  onColumnChange,
}) => {
  const [selectedOption, setSelectedOption] = useState(type);
  const [columnName, setColumnName] = useState(column);
  const handleSelectedOptions = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };
  const handleColumnName = (e: any) => {
    setColumnName(e.target.value);
  };
  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    console.log('Submit');
    onColumnChange(selectedOption, columnName, selectedOption);
  };

  console.log(columnName);
  return (
    <form onSubmit={handleOnSubmit} className="modal-options">
      <input
        name="col-name"
        type="text"
        onChange={handleColumnName}
        value={columnName}
      />
      <select value={selectedOption} onChange={handleSelectedOptions}>
        {types.map((e) => {
          if (selectedOption === e.type.toLowerCase()) {
            return (
              <option
                style={{ backgroundColor: '#f0f5ff', color: '#2f54eb' }}
                key={e.id}
                value={e.type.toLowerCase()}
              >
                {e.type}
              </option>
            );
          }
          return (
            <option key={e.id} value={e.type.toLowerCase()}>
              {e.type}
            </option>
          );
        })}
      </select>
      <input name="description" type="text" placeholder="Description" />
      <input name="default" type="text" placeholder="Default Value" />
      <input name="expression" type="text" placeholder="Expression" />
      <button type="submit" />
    </form>
  );
};

export default TypesOptions;
