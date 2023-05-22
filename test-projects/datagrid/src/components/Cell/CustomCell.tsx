import React, { useState } from 'react';
import '../css/customCell.css';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { useStore } from '../../store';
interface IProps {
  onEdit: (params: any) => void;
  cellValue?: string;
  whenRowData?: any;
  id?: any;
}

const CustomCell: React.FC<IProps> = ({ onEdit, cellValue }) => {
  const [hovering, setHovering] = useState(false);

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };
  return (
    <div style={{ position: 'relative' }}>
      <div
        className="cell"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="cell-type">Between</div>
        <span>{cellValue}</span>
        {hovering && (
          <button className="edit-btn" onClick={onEdit}>
            <MdOutlineModeEditOutline className="edit-btn-icon" />
          </button>
        )}
      </div>
      <div className="cell-modal"></div>
    </div>
  );
};

export default CustomCell;
