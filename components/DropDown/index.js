import React, { forwardRef } from "react";

const DropDown = forwardRef((props, ref) => {
  const { fullScreen, type } = props;

  return (
    <div>
      {fullScreen && (
        <div className="bg-gray-100 opacity-70 fixed left-0 right-0 bottom-0 top-0"></div>
      )}
      <div ref={ref} className={`dropdown ${type || ""}`}>
        {props.children}
      </div>
    </div>
  );
});

DropDown.displayName = "DropDown";

export default DropDown;
