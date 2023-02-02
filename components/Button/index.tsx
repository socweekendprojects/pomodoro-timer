import React from 'react'
type ButtonProps = {
  handleClick:  (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  buttonText: string,
}


export default function Button({handleClick, buttonText}:ButtonProps) {
  return (
    <div className="rounded-full h-[40px] w-[80px] flex items-center justify-center buttonShadow ">
      <button className="font-thin" onClick={handleClick}>
        {buttonText}
      </button>
    </div>
  );
}
