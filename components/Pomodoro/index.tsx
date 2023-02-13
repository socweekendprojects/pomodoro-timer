import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type PomodoroProp = {
  text: string;
  heading: string;
  percentage: number;
};

export default function Pomodoro({ text, heading, percentage }: PomodoroProp) {
  return (
    <div
      className={`rounded-full h-[260px] w-[260px] flex items-center justify-center transition-all ease-in-out duration-[1000ms] ${
        heading === "Work Time" ? "pomodoroShadow" : "pomodoroShadowBreak"
      }`}
    >
      {/* <h1 className="font-thin">{text}</h1> */}
      <div className="p-2">
        <CircularProgressbar
          styles={buildStyles({
            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.3,
            pathColor: `white`,
            textColor: "white",
            trailColor: "none",
          })}
          value={percentage}
          maxValue={1}
          counterClockwise={true}
          text={`${text}`}
          strokeWidth={2}
        />
      </div>
    </div>
  );
}

