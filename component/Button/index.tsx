import React from 'react'
type ButtonProps = {
  handleClick:  (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  buttonText: string,
}


export default function Button({handleClick, buttonText}:ButtonProps) {
  return (
    <button onClick={handleClick}>{buttonText}</button>
  )
}
