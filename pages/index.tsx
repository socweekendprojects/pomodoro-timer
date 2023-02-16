import type { NextPage } from "next";
import Pomodoro from "../components/Pomodoro";
import Button from "../components/Button";
import Heading from "../components/Heading";
import { useState, useRef } from "react";

const Home: NextPage = () => {
  /*useRef is used as useState did not work (read the Readme for more info) */

  //interval keeps track of the time
  const interval = useRef<number>();
  const breakCount = useRef<number>(0);
  const mins = useRef<number>(24);
  const secs = useRef<number>(60);

  //this is the hardcoded intial display
  const [time, setTime] = useState({ mins: 25, secs: 0.0 });
  const [playBtnState, setPlayBtnState] = useState(false);
  const [heading, setHeading] = useState("Work Time");
  const [index, setIndex] = useState(0);

  let workTime = 25;
  let breakTime = 5;
  let longBreak = 15;

  function timer() {
    secs.current = secs.current - 1;
    if (secs.current < 0) {
      mins.current = mins.current - 1;
      secs.current = 59;
    }
    if (mins.current < 0) {
      breakCount.current = breakCount.current + 1;
      console.log("breakcount is:", breakCount);
      if (breakCount.current === 1 || breakCount.current === 3) {
        setHeading("Short Break");
        mins.current = breakTime - 1;
        secs.current = 59;
      } else if (
        breakCount.current === 0 ||
        breakCount.current === 2 ||
        breakCount.current === 4
      ) {
        setHeading("Work Time");
        mins.current = workTime - 1;
        secs.current = 59;
      } else {
        setHeading("Long Break");
        mins.current = longBreak - 1;
        secs.current = 59;
        breakCount.current = -1;
      }
    }

    // console.log("mins" + mins, "secs" + secs, "count" + breakCount);
    setTime({ ...time, mins: mins.current, secs: secs.current });
  }

  function handleStart() {
    //the window use here makes typescript happy
    interval.current = window.setInterval(timer, 1000);
  }

  function handlePause() {
    clearInterval(interval.current);
  }

  function handleReset() {
    clearInterval(interval.current);
    mins.current = 25;
    secs.current = 0.0;
    breakCount.current = 0;
    setTime({ mins: mins.current, secs: secs.current });
  }

  function handleSkip() {
    const phases = ["Short Break", "Work Time", "Short Break", "Work Time", "Short Break", "Work Time", "Long Break", "Work Time"];
    setIndex(index < 7 ? index + 1 : 0);
    setHeading(phases[index]);
    secs.current = 60;
    if (phases[index] === "Short Break") {
      setTime({ mins: 5, secs: 0.0 });
      mins.current = breakTime - 1;
      breakCount.current = breakCount.current++
    } else if (phases[index] === "Long Break") {
      setTime({ mins: 15, secs: 0.0 });
      mins.current = longBreak - 1;
      breakCount.current = -1;
    } else {
      mins.current = workTime - 1;
      setTime({ mins: 25, secs: 0.0 });
    }
  }

  //for circle progress bar
  let percentage =
    heading === "Work Time"
      ? Number(time.mins + time.secs / 60) / 25
      : heading === "Short Break"
      ? Number(time.mins + time.secs / 60) / 5
      : Number(time.mins + time.secs / 60) / 15;
  
  console.log(time.mins);
  console.log(percentage);
  
  return (
    <div
      className={`flex items-center flex-col justify-center min-h-screen min-w-screen text-white transition-all ease-in-out duration-[500ms] ${
        heading === "Work Time" ? "bg-light-primary" : "bg-light-secondary"
      }`}
    >
      <div className="flex flex-col items-center gap-20 justify-center min-h-[50vh] min-w-[40vw]">
        <Heading heading={heading} />
        <Pomodoro
          percentage={percentage}
          heading={heading}
          text={`${time.mins >= 10 ? time.mins : `0${time.mins}`}:${
            time.secs >= 10 ? time.secs : `0${time.secs}`
          }`}
        />
        <div className="flex gap-8">
          <Button
            heading={heading}
            handlePause={() => {
              handlePause(), setPlayBtnState(!playBtnState);
            }}
            buttonText={playBtnState ? "Pause" : "Play"}
            handleClick={() => {
              handleStart(), setPlayBtnState(!playBtnState);
            }}
          />
          <Button
            heading={heading}
            handlePause={() => {
              handlePause(), setPlayBtnState(!playBtnState);
            }}
            buttonText={"Reset"}
            handleClick={() => {
              handleReset(), setPlayBtnState(false), setHeading("Work Time");
            }}
          />
          <Button
            heading={heading}
            buttonText={"Skip"}
            handleClick={handleSkip}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
