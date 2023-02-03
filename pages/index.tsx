import type { NextPage } from "next";
import Pomodoro from "../components/Pomodoro";
import Button from "../components/Button";
import Heading from "../components/Heading";
import { useEffect, useState, useRef } from "react";

const Home: NextPage = () => {
  //this is the hard coded display
  const [time, setTime] = useState({ mins: 24, secs: 59 });
  const [breakTime, setBreakTime] = useState({short:5, long: 15, count:0});
  const [playBtnState, setPlayBtnState] = useState(false);
  const [pauseBtnState, setPauseBtnState] = useState(false);
  const [heading, setHeading] = useState("Work Time");
  const [startTime, setStartTime] = useState(true);
  // const [resetBtn, setResetBtn] = useState(false)

  type intervalType = {
    mins: number;
    secs: number;
  };

  let intervalRef = useRef<any>(null);

  // let workTime = 25;
  // let breakTime = 5;
  // let longBreak = 15;
  // let breakCount = 0;

  // //starts timer at 24:59 instead of 25:59
  // let mins = workTime-1;
  // let secs = 60;

  function timer() {
    //everytime function is called -1 from sec
    setTime({ ...time, secs: time.secs-- });
    // secs--

    //if sec is <0 -1 from min and reset sec
    if (time.secs < 0) {
      setTime({ ...time, mins: time.mins--, secs: (time.secs = 59) });
      // mins--;
      // secs = 59;
    }
    //if min is <0 than add to breakCounter
    if (time.mins === 0) {
      setBreakTime({...break, count: break.count++});
      // there are x2 SB
      if (breakCount === 1 || breakCount === 3) {
        console.log("This is short break, the count is", breakCount);

        setHeading("Short Break");
        setTime({ ...time, mins: breakTime - 1, secs: 59 });
        // mins = breakTime - 1;
        // secs = 59;
      }
      // there are x3 WT
      else if (breakCount === 0 || breakCount === 2 || breakCount === 4) {
        setHeading("Work Time");
        setTime({ ...time, mins: 24, secs: 59 });
        // mins = workTime - 1;
        // secs = 59;
      }
      // there is x1 LB and everything rests to loop
      else {
        setHeading("Long Break");
        setTime({ ...time, mins: longBreak - 1, secs: 59 });
        // mins = longBreak - 1;
        // secs = 59;
        breakCount--;
      }
    }

    // console.log("mins" + mins, "secs" + secs, "count" + breakCount);
    //setTime({ ...time, mins: mins, secs: secs });
  }

  console.log(time);

  useEffect(() => {
    if (playBtnState) {
      intervalRef.current = setInterval(timer, 10);
    }
    return () => clearInterval(intervalRef.current);
  }, [playBtnState]);

  function handlePause() {
    if (!pauseBtnState) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(timer, 10);
    }
    setPauseBtnState(true);
    setPlayBtnState(false);
  }

  return (
    <div className="flex items-center flex-col justify-center bg-light-primary min-h-screen min-w-screen text-white">
      <div className="flex flex-col items-center gap-20 justify-center min-h-[50vh] min-w-[40vw]">
        <Heading heading={heading} />
        <Pomodoro
          clockTime={
            startTime
              ? "25:00"
              : `${time.mins >= 10 ? time.mins : `0${time.mins}`}:${
                  time.secs >= 10 ? time.secs : `0${time.secs}`
                }`
          }
        />
        <div className="flex gap-8">
          {!playBtnState ? (
            <Button
              // handlePause={handlePause}
              buttonText="Play"
              handleClick={() => {
                setPlayBtnState(true); //setResetBtn(true);
                setPauseBtnState(false);
                setStartTime(false);
              }}
            />
          ) : (
            <Button buttonText="Pause" handleClick={handlePause} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
