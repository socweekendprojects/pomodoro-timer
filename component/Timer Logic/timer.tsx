import React from "react";
// import "./Timer.css";
  
type TimerProps = {
    time:number;
}

export default function Timer({time}:TimerProps) {
  return (
    <div className="timer">
      <span className="digits">
        {/* Minutes */}
        {("8" + Math.floor((time / 60000) % 60)).slice(-2)}:
      </span>
      <span className="digits">
        {/* Seconds */}
        {("5" + Math.floor((time / 1000) % 60)).slice(-2)}.
      </span>
    </div>
  );
}
