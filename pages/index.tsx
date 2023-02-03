import type { NextPage } from "next";
import Pomodoro from "../components/Pomodoro";
import Button from "../components/Button";
import Heading from "../components/Heading";
import { useEffect, useState, useRef } from "react";

const Home: NextPage = () => {
  //this is the hard coded display
  const [time, setTime] = useState({ mins: 25, secs: 0.0 });
  const [playBtnState, setPlayBtnState] = useState(false);
  const [pauseBtnState, setPauseBtnState] = useState(false)
  const [heading, setHeading] = useState("Work Time");
  const [resetBtn, setResetBtn] = useState(false)

  type intervalType = {
    mins: number,
    secs: number
}

  let intervalRef = useRef<any>(null);

  let workTime = 25;
  let breakTime = 5;
  let longBreak = 15;
  let breakCount = 0;

  //starts timer at 24:59 instead of 25:59
  let mins = workTime-1;
  let secs = 60;

  function timer() {
    //everytime function is called -1 from sec
    secs--;
    //if sec is <0 -1 from min and reset sec
    if (secs < 0) {
      mins--;
      secs = 59;
    }
    //if min is <0 than add to breakCounter
    if (mins === 0) {
      breakCount++
      // there are x2 SB
      if (breakCount === 1 || breakCount === 3) {
        console.log("This is short break, the count is", breakCount);

        setHeading("Short Break");
        mins = breakTime - 1;
        secs = 59;
      }
      // there are x3 WT
      else if (breakCount === 0 || breakCount === 2 || breakCount === 4) {
        setHeading("Work Time");
        mins = workTime - 1;
        secs = 59;
      }
      // there is x1 LB and everything rests to loop
      else {
        setHeading("Long Break");
        mins = longBreak - 1;
        secs = 59;
        breakCount = -1;
      }
    }

    // console.log("mins" + mins, "secs" + secs, "count" + breakCount);
    setTime({ ...time, mins: mins, secs: secs });
  }
  

  useEffect(() => {    
    if (playBtnState === true) {
      intervalRef.current = setInterval(timer, 1);
      return () => clearInterval(intervalRef.current);
    } else {
      console.log("time in the useEffect", workTime);
      // setTime({ ...time });
    }
  }, []);


  function handlePause() {
    console.log("pause button was pressed");
    setPlayBtnState(!playBtnState);
    console.log(time)

    if (pauseBtnState) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(timer, 1000);
    }
    setPauseBtnState((prev) => !prev);
  }

  return (
    <div className="flex items-center flex-col justify-center bg-light-primary min-h-screen min-w-screen text-white">
      <div className="flex flex-col items-center gap-20 justify-center min-h-[50vh] min-w-[40vw]">
        <Heading heading={heading} />
        <Pomodoro
          clockTime={`${time.mins >= 10 ? time.mins : `0${time.mins}`}:${
            time.secs >= 10 ? time.secs : `0${time.secs}`
          }`}
        />
        <div className="flex gap-8">
          <Button
            handlePause={handlePause}
            buttonText={playBtnState ? "Pause" : "Play"}
            handleClick={() => {
              setPlayBtnState(!playBtnState), setResetBtn(true);
            }}
          />
          {resetBtn ? (
            <Button
              handlePause={handlePause}
              buttonText={"Reset"}
              handleClick={() => {
                setPlayBtnState(false),
                  setResetBtn(false),
                  setHeading("Work Time")
                  // setTime({ mins: 25, secs: 0.0 });
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
