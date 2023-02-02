import type { NextPage } from 'next'
import Head from 'next/head'
import Pomodoro from '../component/Pomodoro'
import Button from '../component/Button'
import ButtonContainer from '../component/ButtonContainer'
import Heading from '../component/Heading'
import { useState } from 'react'

const Home: NextPage = () => {
  const [time, setTime] = useState('')

  let workTime = 1;
  let breakTime = 2;
  let longBreak = 3;
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
        mins = breakTime - 1;
        secs = 59;
      } else if (breakCount === 0 || breakCount === 2 || breakCount === 4) {
        mins = workTime - 1;
        secs = 59;
      } else {
        mins = longBreak - 1;
        secs = 59;
        breakCount = -1;
      }
    }

    console.log("mins" + mins, "secs" + secs, "count" + breakCount);
    setTime(`${mins}:${secs}`)
  }

  setInterval(timer, 1000);

  return (
    <div>
      <Heading></Heading>
      <Pomodoro text={time}></Pomodoro>
      <Button></Button>
      <ButtonContainer></ButtonContainer>
    </div>
  )
}

export default Home
