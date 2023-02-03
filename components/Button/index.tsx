import React from 'react'
type ButtonProps = {
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  buttonText: string;
  //handlePause: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};


export default function Button({ handleClick, buttonText, }: ButtonProps) {
  // function handlePause() {
  //   console.log("I was pressed");
  // }
  return (
    <div className="rounded-full h-[40px] w-[80px] flex items-center justify-center buttonShadow ">
      <button
        className="font-thin h-full w-full"
       // onClick={buttonText === 'Pause' ? handlePause : handleClick}
        // {buttonText === "Pause" ? console.log("pause") : null}
        onClick={handleClick}
      >
        {buttonText}
      </button>
    </div>
  );
}
