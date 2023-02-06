import React from "react";

type PomodoroProp = {
  text: string;
  heading: string;
};

export default function Pomodoro({ text, heading }: PomodoroProp) {
  return (
    <div
      className={`rounded-full h-[260px] w-[260px] flex items-center justify-center transition-all ease-in-out duration-[1000ms] ${
        heading === "Work Time" ? "pomodoroShadow" : "pomodoroShadowBreak"
      }`}
    >
      <h1 className="font-thin">{text}</h1>
    </div>
  );
}

//transition-all ease-in-out duration-[5000ms]
