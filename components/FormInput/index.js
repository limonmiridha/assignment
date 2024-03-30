"use client"
import React, { useEffect, useRef } from "react";

const FormInput = (props) => {
  const { id, label, prefix, error, isOptional, ...restProps } = props;

  const inputElement = useRef(null);
  useEffect(() => {
    if (inputElement.current && props.autoFocus) {
      inputElement.current.focus();
    }
  }, []);

  return (
    <div
      className={`w-full flex flex-col items-start ${
        error ? "text-rose-500 border-x-orange-300" : ""
      }`}
    >
      <label htmlFor={id} className="text-sm font-bold text-gray-700">
        {label} {isOptional && <span>(Optional)</span>}
      </label>
      {prefix ? (
        <div
          className={`w-full flex p-3 mt-2 text-sm border border-solid rounded-md bg-gray-50 sm:p-4 focus:ring focus:outline-none focus:border-primary-500 ${
            error ? "border-rose-500" : "border-gray-300"
          }`}
        >
          <div className="flex gap-2 py-1 items-center">
            {prefix}
            <input
              id={id}
              ref={inputElement}
              className="float-left text-xs font-bold text-gray-600 align-middle bg-red-400"
              {...restProps}
            />
          </div>
          {restProps.maxlength && (
            <span className="text-sm font-medium text-gray-600 float-right">
              {restProps.value.length}/
              {restProps.maxlength - restProps.value.length}
            </span>
          )}
        </div>
      ) : (
        <div className="w-full">
          <input
            id={id}
            ref={inputElement}
            className={`font-medium w-full p-3 text-sm border border-solid rounded-md  sm:p-4 focus:ring focus:outline-none  mt-2 focus:ring-purple-100  ${
              restProps.readOnly ? "bg-gray-200" : ""
            } ${error ? " border-rose-500 " : "border-gray-500"}`}
            {...restProps}
          />
          {restProps.maxlength && (
            <span className="text-sm font-medium text-gray-600 float-right">
              {restProps.value.length}/
              {restProps.maxlength - restProps.value.length}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default FormInput;
