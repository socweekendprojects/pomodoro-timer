import React from "react";
type ButtonProps = {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handlePause?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  buttonText: string;
  heading: string;
};

export default function Button({
  handleClick,
  buttonText,
  handlePause,
  heading,
}: ButtonProps) {
  return (
    <div
      className={`rounded-full h-[40px] w-[80px] flex items-center justify-center transition-all ease-in-out duration-[1000ms] ${
        heading === "Work Time" ? "buttonShadow" : "buttonShadowBreak"
      }`}
    >
      <button
        className="font-thin h-full w-full"
        onClick={buttonText === "Pause" ? handlePause : handleClick}
      >
        {buttonText}
      </button>
    </div>
  );
}
