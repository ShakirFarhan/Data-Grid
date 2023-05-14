import { useState } from 'react';
import './common.css';
import TypesOptions from './TypesOptions';
import { BsPinAngleFill } from 'react-icons/bs';
import { RxHamburgerMenu } from 'react-icons/rx';
import { CiMenuKebab } from 'react-icons/ci';
import { columnHeaderProps } from '../../constants/interfaces';

const CustomHeaderCell: React.FC<columnHeaderProps> = ({
  label,
  children,
  type,
  onColumnChange,
}) => {
  const [modalActive, setModalActive] = useState(false);
  const [pinned, setPinned] = useState(false);
  const handleModal = () => {
    setModalActive((data) => {
      return !data;
    });
  };
  const handlePinning = () => {
    setPinned((data) => !data);
  };

  return (
    <>
      <div onClick={handleModal} className="custom-column-header">
        <span style={{ fontWeight: '400', fontSize: '15px' }}>{label}</span>
        <span
          style={{ marginRight: '4px', fontSize: '12px', color: '#829df7' }}
        >
          {type}
        </span>

        {children}
      </div>
      {modalActive && (
        <div className="type-model">
          <TypesOptions
            type={type}
            column={label}
            onColumnChange={onColumnChange}
          />
        </div>
      )}

      <div className="column-props">
        <RxHamburgerMenu className="move-btn" />
        <BsPinAngleFill
          onClick={handlePinning}
          className={pinned ? 'pinned' : 'pin-btn'}
        />
        <CiMenuKebab className="menu-btn" />
      </div>
    </>
  );
};
export default CustomHeaderCell;
