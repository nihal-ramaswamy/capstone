import { useDispatch, useSelector } from "react-redux";
import { selectMediaState, setMediaState } from "../../store/mediaSlice";
import timer, { SelectTimerState, setTimerState } from "../../store/timer";
import { useEffect, useRef, useState } from "react";
import Video from "../Video/Video.component";
import Audio from "../Audio/Audio.component";
import { writeUserData } from "../../db/db";
import axios from "axios";

const UserMedia = () => {
  const mediaState = useSelector(selectMediaState);
  const timerState = useSelector(SelectTimerState);
  const dispatch = useDispatch();

  const [userVideo, setUserVideo] = useState<string | null>(null);
  const [userAudio, setUserAudio] = useState<string | null>(null);
  const intervalId = useRef<NodeJS.Timer>();

  useEffect(() => {
    intervalId.current = setInterval(() => dispatch(setTimerState(!timerState)), 5000);
    return () => {
      clearInterval(intervalId.current);
    }
  }, [dispatch]);

  useEffect(() => {
    if (timerState) {
      dispatch(setMediaState(true));
    }
  }, [timerState]);


  const saveToDb = async () => {
    if (userAudio == null || userVideo == null) {
      alert(
        `Video or Audio is null. ${userAudio == null} ${userVideo == null}`
      );
      return;
    }
    const logID = await writeUserData(
      "AAAA",
      "BBBB",
      "email",
      userVideo,
      userAudio
    );

    console.log("Log id: ", logID);
    dispatch(setMediaState(false));

    axios
      .get("/api/validate", {
        params: {
          email: "email",
          userId: "BBBB", // TODO: replace this with actual email and user id
          id: logID, // TOOD: add even test id
        },
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <div>
      <div>
        <Video setImage={setUserVideo} />
      </div>
      <div>
        <Audio setAudio={setUserAudio} />
      </div>
      <button onClick={() => dispatch(setMediaState(true))}>Click Here</button>
      <button onClick={() => saveToDb()}>Save to DB</button>
    </div>
  );
};

export default UserMedia;
