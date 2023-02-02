import React from 'react'

export default function TimerLogic() {

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
  }

  setInterval(timer, 1000);
  
  return (
    <div>TimerLogic</div>
  )
}





