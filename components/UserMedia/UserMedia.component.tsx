import { useDispatch, useSelector } from "react-redux";
import { selectMediaState, setMediaState } from "../../store/mediaSlice";
import { SelectTimerState, setTimerState } from "../../store/timer";
import { useEffect, useRef, useState } from "react";
import Video from "../Video/Video.component";
import Audio from "../Audio/Audio.component";
import { writeUserData } from "../../db/db";
import axios from "axios";
import { selectUserEmail, selectUserId } from "../../store/user";

const UserMedia = () => {
  const mediaState = useSelector(selectMediaState);
  const timerState = useSelector(SelectTimerState);
  const userEmail = useSelector(selectUserEmail);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  const [userVideo, setUserVideo] = useState<string | null>(null);
  const [userAudio, setUserAudio] = useState<string | null>(null);
  const intervalId = useRef<NodeJS.Timer>();

  useEffect(() => {
    intervalId.current = setInterval(
      () => dispatch(setTimerState(!timerState)),
      5000
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
    (async () => {
      if (userAudio == null || userVideo == null || userId == null || userEmail == null) {
        return;
      }
      const logID = await writeUserData(
        userId,
        userEmail, 
        userVideo,
        userAudio
      );

      setUserAudio(null);
      setUserVideo(null);
      console.log(logID);

      dispatch(setMediaState(false));
      dispatch(setTimerState(false));

      axios
        .get("/api/validate", {
          params: {
            email: userEmail,
            userId: userId, // TODO: replace this with actual email and user id
            id: logID, // TOOD: add even test id
          },
        })
        .then((response) => {
          console.log(response.data);
        });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAudio, userVideo]);

  return (
    <div>
      <div>Timer: {timerState ? "True" : "False"}</div>
      <div>Media: {mediaState ? "True" : "False"}</div>
      <div>
        <Video setImage={setUserVideo} />
      </div>
      <div>
        <Audio setAudio={setUserAudio} />
      </div>
    </div>
  );
};

export default UserMedia;
