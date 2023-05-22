import { useState } from 'react';
import './common.css';
import TypesOptions from './TypesOptions';
import { BsPinAngleFill } from 'react-icons/bs';
import { RxHamburgerMenu } from 'react-icons/rx';
import { CiMenuKebab } from 'react-icons/ci';
import { columnHeaderProps } from '../../constants/interfaces';
import { MdKeyboardArrowDown } from 'react-icons/md';
import ColOptions from './ColOptions';

const CustomHeaderCell: React.FC<columnHeaderProps> = ({
  label,
  children,
  type,
  id,
  userColumn,
  onColumnChange,
  handlePin,
  setWhenColumnDefs,
}) => {
  const [modalActive, setModalActive] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const handleModal = () => {
    setModalActive((data) => {
      return !data;
    });
  };
  const handlePinning = () => {
    if (!pinned) {
      setPinned(true);
      handlePin(id, pinned);
    } else {
      setPinned(false);
    }
  };
  if (userColumn) {
    return (
      <>
        <div onClick={handleModal} className="custom-column-header">
          {!label || label === '' ? (
            <span
              style={{ fontWeight: '400', fontSize: '15px', color: '#9a9b9e' }}
            >
              Input
            </span>
          ) : (
            <span style={{ fontWeight: '400', fontSize: '15px' }}>{label}</span>
          )}

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
              id={id}
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
            className={pinned ? 'pin-btn' : 'pinned'}
          />
          <CiMenuKebab
            onClick={() => {
              setOptionsVisible(true);
            }}
            className="menu-btn"
          />
          <ColOptions />
        </div>
      </>
    );
  }
  return (
    <button className="any-btn">
      <span>Any</span>
      <MdKeyboardArrowDown className="bottom-arrow-icon" />
    </button>
  );
};
export default CustomHeaderCell;
