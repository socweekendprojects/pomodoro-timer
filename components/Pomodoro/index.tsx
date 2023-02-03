import React from "react";

type PomodoroProp = {
  clockTime: string;
};

export default function Pomodoro({ clockTime }: PomodoroProp) {
  return (
    <div className="rounded-full h-[260px] w-[260px] flex items-center justify-center pomodoroShadow">
      <h1 className="font-thin">{clockTime}</h1>
    </div>
  );
}
