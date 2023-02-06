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
      <CircularProgressbar
        styles={buildStyles({
          // Rotation of path and trail, in number of turns (0-1)
          // rotation: 0.25,

          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          // strokeLinecap: "butt",

          // Text size
          // textSize: "16px",

          // How long animation takes to go from one percentage to another, in seconds
          pathTransitionDuration:0.3,

          // Colors
          pathColor: `white`,
          textColor: "white",
          trailColor: "none",
          // backgroundColor: "white",
        })}
        value={percentage}
        maxValue={1}
        counterClockwise={true}
        text={`${text}`}
        strokeWidth={2}
      />
    </div>
  );
}

