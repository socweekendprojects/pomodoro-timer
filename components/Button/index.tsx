import React from 'react'
type ButtonProps = {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handlePause: (e: React.MouseEvent<HTMLButtonElement>) => void;
  buttonText: string;
};


export default function Button({ handleClick, buttonText, handlePause }: ButtonProps) {
  return (
    <div className="rounded-full h-[40px] w-[80px] flex items-center justify-center buttonShadow ">
      <button
        className="font-thin h-full w-full"
        onClick={buttonText === "Pause" ? handlePause : handleClick}
      >
        {buttonText}
      </button>
    </div>
  );
}
