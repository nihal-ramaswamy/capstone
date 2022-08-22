import RecorderControls from "../RecorderControls/RecorderControls.component";
import RecordingsList from "../RecordingsList/RecordingsList.component";
import useRecorder from "../../hooks/useRecorder.hooks";
import { UseRecorder } from "../../types/Audio.types";
import classes from './Audio.module.css';
import { Dispatch, SetStateAction } from "react";

interface AudioProps {
  setAudio: Dispatch<SetStateAction<string | null>>;
}

const Audio = (props: AudioProps) => {
  const { recorderState, ...handlers }: UseRecorder = useRecorder();
  const { audio } = recorderState;

  return (
    <section className={classes.voiceRecorder}>
      <h1 className={classes.title}>Voice Recorder</h1>
      <div className={classes.recorderContainer}>
        <RecorderControls recorderState={recorderState} handlers={handlers} />
        <RecordingsList audio={audio} />
      </div>
    </section>
  );
}

export default Audio;
