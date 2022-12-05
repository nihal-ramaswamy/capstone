import { useDispatch, useSelector } from "react-redux";
import { setMediaState } from "../../store/mediaSlice";
import { SelectTimerState, setTimerState } from "../../store/timer";
import { useEffect, useRef, useState } from "react";
import Video from "../Video/Video.component";
import Audio from "../Audio/Audio.component";
import { writeUserData } from "../../db/db";
import axios from "axios";
import Timer from "../../components/Timer/Timer.component";

interface UserMediaProps {
  uid: string | null | undefined;
  email: string | null | undefined;
}

const UserMedia = (props: UserMediaProps) => {
  const timerState = useSelector(SelectTimerState);
  const dispatch = useDispatch();

  const [userVideo, setUserVideo] = useState<string | null>(null);
  const [userAudio, setUserAudio] = useState<string | null>(null);
  const [warningScore, setWarningScore] = useState<number>(12);
  const [warningMessage, setWarningMessage] = useState<string>("");
  const intervalId = useRef<NodeJS.Timer>();

  useEffect(() => {
    intervalId.current = setInterval(
      () => dispatch(setTimerState(!timerState)),
      15000
    );
    return () => {
      clearInterval(intervalId.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (timerState) {
      dispatch(setMediaState(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerState]);

  useEffect(() => {
    let active = true;
    (async () => {
      if ( active == false || userAudio == null || userVideo == null || props.uid == null || props.email == null) {
        return;
      }
      const logID = await writeUserData(
        props.uid,
        props.email, 
        userVideo,
        userAudio
      );

      setUserAudio(null);
      setUserVideo(null);

      dispatch(setMediaState(false));
      dispatch(setTimerState(false));

      axios
        .get("/api/validate", {
          params: {
            email: props.email,
            userId: props.uid, 
            id: logID, 
          },
        })
        .then((response) => {
          const score = parseInt(response.data["data"][0]);
          console.log({score});
          if (score === 5) {
            setWarningMessage("Score is 5."); 
          } else if (score === 1) {
            setWarningMessage("");
          } else {
            let temp = warningScore;
            temp -= score;
            if (temp <= 0) {
              setWarningMessage("Score went below 12.");
              setWarningScore(12);
            } else {
              setWarningScore(temp);
            }
          }

        });
    })();
    return () => {
      active = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAudio, userVideo]);

  const renderNavBar = () => {
      return (
       <> 
          <li>
            <Timer time ={425} />
          </li>

        </>
      );
    }
  
  

  return (
    <div>
      <div className="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          {renderNavBar()}
        </ul>
      </div>      
      <div>
        <Video setImage={setUserVideo} />
      </div>
      <div className="border-2 border-black hidden">
        <Audio  setAudio={setUserAudio} />
      </div>
      <div className="text-red-500">{warningMessage} {warningScore}</div>
    </div>
  );
};

export default UserMedia;
