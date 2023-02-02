import type { NextPage } from "next";
import Pomodoro from "../components/Pomodoro";
import Button from "../components/Button";
import ButtonContainer from "../components/ButtonContainer";
// import '../styles/globals.css'
import Heading from "../components/Heading";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [time, setTime] = useState({ mins: 25, secs: 0 });
  const [playBtnState, setPlayBtnState] = useState(false);
  const [pauseBtnState, setPauseBtnState] = useState(false);
  const [heading, setHeading] = useState("Work Time");
  const [resetBtn, setResetBtn] = useState(false)

  let workTime = 25;
  let breakTime = 5;
  let longBreak = 15;
  let breakCount = 0;

  let mins = workTime - 1;
  let secs = 60;

  function timer() {
    secs--;
    if (secs < 0) {
      mins--;
      secs = 59;
    }
    if (mins < 0) {
      breakCount++;

      if (breakCount === 1 || breakCount === 3) {
        setHeading("Short Break");
        mins = breakTime - 1;
        secs = 59;
      } else if (breakCount === 0 || breakCount === 2 || breakCount === 4) {
        setHeading("Work Time");
        mins = workTime - 1;
        secs = 59;
      } else {
        setHeading("Long Break");
        mins = longBreak - 1;
        secs = 59;
        breakCount = -1;
      }
    }

    console.log("mins" + mins, "secs" + secs, "count" + breakCount);
    setTime({ ...time, mins: mins, secs: secs });
  }

  useEffect(() => {
    if (playBtnState === true) {
      const interval = setInterval(timer, 1);
      // if (pauseBtnState === true) {
      //   ()=> clearInterval(interval)
      // }
      return () => clearInterval(interval);
    } else {
      setTime({ ...time, mins: 25, secs: 0o0 });
    }
  }, [playBtnState, pauseBtnState]);

  return (
    <div className="flex items-center flex-col justify-center bg-light-primary min-h-screen min-w-screen text-white">
      <div className="flex flex-col items-center gap-20 justify-center min-h-[50vh] min-w-[40vw]">
        <Heading heading={heading} />
        <Pomodoro
          text={`${time.mins >= 10 ? time.mins : `0${time.mins}`}:${
            time.secs >= 10 ? time.secs : `0${time.secs}`
          }`}
        />
        <div className="flex gap-8">
          <Button
            buttonText={playBtnState ? "Pause" : "Play"}
            handleClick={() => {
              setPlayBtnState(!playBtnState), setResetBtn(true);
            }}
          />
          {resetBtn ? (
            <Button
              buttonText={"Reset"}
              handleClick={() => { setPlayBtnState(false), setResetBtn(false); }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;

/**
W
SB
W
SB
W
SB
W
LB
Loops

 Stage 1
 Heading: Get Ready
 Button: Play
 Time: 25:00 hard coded

 Stage 2: Press Play
 Heading: WorkTime
 Button: Pause Reset 
 Time: from a state time

Stage 3: Press Play
 Heading: Break
 Button: Pause Reset 
 Time: from a state time

 Stage 3a: Press Play
 Heading: Long Break
 Button: Pause Reset 
 Time: from a state time
 
 */
