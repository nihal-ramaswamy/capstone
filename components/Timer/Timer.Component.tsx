import {useEffect, useState, FC} from "react";

interface State {
  time: number;
  seconds: number;
  minutes: number;
}

interface Props {
  time: number;
}
const Timer: FC<Props> = ({time}) => {
   const [state, setState] = useState<State>({
    time,
    seconds: Math.floor((time-1)/60),
    minutes: time - Math.floor((time-1)/60) * 60 * 1,
  });

  useEffect(() => {
    setTimeout(() => {
      if (state.time===0) {
        return;
      }
      setState ({
        time: state.time - 1,
        minutes: Math.floor((state.time-1)/60),
        seconds: (state.time - Math.floor((state.time-1)/60) * 60 * 1),
      });
    }, 1000);
  }, [state.time]);

  return (
    <div className="inline-block text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">
      {`${state.minutes}: ${
      state.seconds <= 10 ? `0${state.seconds}` : state.seconds
    }`}</div>
  )
  };

export default Timer;
  