import React, { useState } from 'react';
import './common.css';
import { MdOutlineModeEditOutline } from 'react-icons/md';
interface IProps {
  onEdit: (params: any) => void;
  cellValue: string;
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
    <div
      className="cell"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span>{cellValue}</span>
      {hovering && (
        <button className="edit-btn" onClick={onEdit}>
          <MdOutlineModeEditOutline className="edit-btn-icon" />
        </button>
      )}
    </div>
  );
};

export default CustomCell;
