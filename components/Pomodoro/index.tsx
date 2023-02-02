import React from "react";

type PomodoroProp = {
  text: string;
};

export default function Pomodoro({ text }: PomodoroProp) {
  return (
    <div className="rounded-full h-[260px] w-[260px] flex items-center justify-center pomodoroShadow">
      <h1 className="font-thin">{text}</h1>
    </div>
  );
}
