import { useState } from 'react';
import '../css/colOptions.css';
import { optionsData } from '../../constants/data';
interface colInterface {
  id: string;
  handleOptions: (id: string, selectedOption: string) => void;
  setOptionsVisible: any;
}
function ColOptions({ handleOptions, id, setOptionsVisible }: colInterface) {
  return (
    <div className="options-modal">
      {optionsData.map((data) => {
        return (
          <p
            onClick={() => {
              handleOptions(id, data.key);
              setOptionsVisible(false);
            }}
            key={data.key}
          >
            {data.function}
          </p>
        );
      })}
    </div>
  );
}

export default ColOptions;
