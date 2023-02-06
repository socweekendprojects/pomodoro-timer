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
    interval.current = window.setInterval(timer, 1);
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

  return (
    <div
      className={`flex items-center flex-col justify-center min-h-screen min-w-screen text-white transition-all ease-in-out duration-[500ms] ${
        heading === "Work Time" ? "bg-light-primary" : "bg-light-secondary"
      }`}
    >
      <div className="flex flex-col items-center gap-20 justify-center min-h-[50vh] min-w-[40vw]">
        <Heading heading={heading} />
        <Pomodoro
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
        </div>
      </div>
    </div>
  );
};

export default Home;
