import React, { useState } from 'react';

function TypesModal() {
  const [modalActive, setModalActive] = useState(false);
  const handleType = () => {
    setModalActive((data) => {
      return !data;
    });
  };
  return (
    <div style={{ zIndex: '10' }}>
      <span
        onClick={handleType}
        style={{ marginRight: '4px', fontSize: '12px', color: '#829df7' }}
      >
        numeric
      </span>
      <div
        style={{ zIndex: '10' }}
        className={`${!modalActive ? 'hidden' : 'type-model'}`}
      >
        active
      </div>
    </div>
  );
}

export default TypesModal;
