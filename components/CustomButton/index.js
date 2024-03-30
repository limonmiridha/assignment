import Loader from "components/Loader";
import React from "react";

const CustomButton = ({
  children,
  isLoading,
  type = "primary",
  disabled,
  rounded,
  font,
  width,
  ...restProps
}) => {
  const getCustomStyle = () => {
    switch (type) {
      case "primary":
        return `${rounded || "rounded-full"} ${width || "w-auto"} ${
          disabled
            ? "bg-gray-500 text-gray-300"
            : "bg-primary-900 text-white  hover:bg-primary-500"
        } px-5 py-2 ${font || "font-normal"}`;

      case "secondary":
        return `${rounded || "rounded-full"} ${width || "w-auto"} ${
          disabled
            ? "bg-gray-500 text-gray-300"
            : "bg-gray-900 text-white  hover:bg-gray-700"
        } px-5 py-2 ${font || "font-normal"}`;

      case "white":
        return `${rounded || "rounded-full"} ${width || "w-auto"} ${
          disabled
            ? "bg-gray-500 text-gray-300"
            : "bg-white text-gray-800  hover:bg-gray-200"
        } px-5 py-2 ${font || "font-normal"}`;

      case "border-white":
        return `${rounded || "rounded-full"} ${width || "w-auto"} ${
          disabled
            ? "text-gray-300"
            : "bg-transparent text-white  hover:bg-white hover:bg-opacity-25"
        } border border-white px-5 py-2 ${font || "font-normal"}`;

      case "border":
        return `${rounded || "rounded-full"} ${width || "w-auto"} ${
          disabled
            ? "text-gray-300"
            : "bg-transparent text-secondary-900  hover:bg-slate-200"
        } border border-gray-900 px-5 py-2 ${font || "font-normal"}`;

      case "icon":
        return `${rounded || "rounded-full"} ${width || "w-auto"} ${
          disabled ? "" : "hover:bg-gray-200"
        } px-4 py-2 ${font || "font-normal"}`;

      case "text":
        return `rounded-md ${width || "w-auto"} font-medium ${
          disabled
            ? "text-gray-800"
            : "text-black-900 hover:text-black-700 hover:bg-gray-200"
        } px-4 py-2 ${font || "font-normal"}`;

      default:
        return `${rounded || "rounded-full"} ${width || "w-auto"} ${
          disabled
            ? "bg-gray-500 text-gray-300"
            : "bg-primary-900 text-white hover:bg-primary-500"
        } px-5 py-2 ${font || "font-normal"}`;
    }
  };

  return (
    <button
      disabled={disabled}
      className={`${getCustomStyle()} flex justify-center ${
        isLoading ? "pointer-events-none" : "cursor-pointer"
      }`}
      {...restProps}
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
};

export default CustomButton;
