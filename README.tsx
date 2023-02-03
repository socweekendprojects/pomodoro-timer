import PlayButton from "../Settings/PlayButton";
import PauseButton from "../Settings/PauseButton";
import SettingsButton from "../Settings/SettingsButton";
import { useState, useEffect, useRef } from "react";

function Timer() {
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work"); // work/break/null
  const [secondsLeft, setSecondsLeft] = useState(0);
  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);
  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }
  useEffect(() => {
    function switchMode() {
      const nextMode = modeRef.current === "play" ? "pause" : "play";
    }
  
    setSecondsLeft(secondsLeftRef.current);
    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }
      tick();
    }, 1000);
    return () => clearInterval(interval);
  }, []);
 
  return (
    <div className="w-full flex justify-around items-center">
    
      <div className="flex w-1/3 justify-between">
        {isPaused ? (
          <PlayButton
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
          />
        ) : (
          <PauseButton
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
          />
        )}

      </div>
    </div>
  );
}
export default Timer;