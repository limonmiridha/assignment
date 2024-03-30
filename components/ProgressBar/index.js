import React from 'react';

const ProgressBar = ({ percentage }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '8px',
        backgroundColor: '#EDEDED',
        borderRadius: '4px',
        margin: '12px 0',
      }}
    >
      <div
        style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: '#29C740',
          borderRadius: '4px',
          transition: `width 500ms ease-in-out`,
        }}
      />
    </div>
  );
};

export default ProgressBar;
