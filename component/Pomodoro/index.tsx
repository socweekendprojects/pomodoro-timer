import React from 'react'

type PomodoroProp = {
  text: string;
};

export default function Pomodoro({ text }: PomodoroProp) {
  return <div>{text}</div>;
}
