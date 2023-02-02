import type { NextPage } from 'next'
import Pomodoro from '../component/Pomodoro'
import Button from '../component/Button'
import ButtonContainer from '../component/ButtonContainer'
import Heading from '../component/Heading'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  const [time, setTime] = useState({mins:25, secs:0});
  const [playBtnState, setPlayBtnState] = useState(false)
  const [pauseBtnState, setPauseBtnState] = useState(false)
  const [heading, setHeading] = useState("Work Time")

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
        setHeading("Short Break")
        mins = breakTime - 1;
        secs = 59;
      } else if (breakCount === 0 || breakCount === 2 || breakCount === 4) {
        setHeading("Work Time")
        mins = workTime - 1;
        secs = 59;
      } else {
        setHeading("Long Break")
        mins = longBreak - 1;
        secs = 59;
        breakCount = -1;
      }
    }

    console.log("mins" + mins, "secs" + secs, "count" + breakCount);
    setTime({...time, mins:mins, secs:secs})
  }

  useEffect(()=> {
    if (playBtnState === true) {
      const interval = setInterval(timer, 1)
      // if (pauseBtnState === true) {
      //   ()=> clearInterval(interval)
      // }
      return ()=> clearInterval(interval)
    } else  {
    setTime({...time, mins:25, secs:0o0})
    }

}, [playBtnState, pauseBtnState])

  return (
    <div>
      <Heading heading={heading}/>
      <Pomodoro text={`${time.mins >= 10? time.mins : `0${time.mins}`}:${time.secs >= 10? time.secs : `0${time.secs}`}`}/>
      {/* <Button buttonText="Reset" handleClick={()=> setResetBtnState(!resetBtnState)}/> */}
      <Button buttonText={playBtnState ? "Reset" : "Play"} handleClick={()=> setPlayBtnState(!playBtnState)}/>
      {/* <Button buttonText="Pause" handleClick={()=> setPauseBtnState(!playBtnState)}/>  */}
    </div>
  )
}

export default Home
