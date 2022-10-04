import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const useCountDown = (minutes: number) => {
  const [countSeconds, setCoundSeconds] = useState(minutes * 60);
  const [isCounting, setIsCounting] = useState(false);

  const totalMinutes = Math.floor(countSeconds / 60);
  const seconds = countSeconds % 60;
  const secondsFormated = seconds.toString().padStart(2, '0');

  useEffect(() => {
    if (countSeconds === 0) {
      setIsCounting(false);
      setCoundSeconds(minutes * 60);
      return;
    }
    if (isCounting === true) {
      setTimeout(() => {
        setCoundSeconds(countSeconds - 1);
      }, 1000);
    }
  }, [countSeconds, isCounting]);
  function CountDown() {
    return (
      <div style={{ width: 45 }}>
        <Typography color={totalMinutes <= 1 ? 'secondary' : undefined}>
          {totalMinutes}:{secondsFormated}
        </Typography>
      </div>
    );
  }

  return {
    Count: CountDown,
    isCounting,
    setCount: () => setIsCounting(true),
  };
};

export default useCountDown;
