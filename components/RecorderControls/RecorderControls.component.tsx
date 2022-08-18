import { formatX } from "../../utils/formatTime.utils";
import { RecorderControlsProps } from "../../types/Audio.types";

export default function RecorderControls({ recorderState, handlers }: RecorderControlsProps) {
  const { recordingMinutes, recordingSeconds, initRecording } = recorderState;
  const { startRecording, saveRecording, cancelRecording } = handlers;

  return (
    <div className="controls-container">
      <div className="recorder-display">
        <div className="recording-time">
          {initRecording && <div className="recording-indicator"></div>}
          <span>{formatX(recordingMinutes)}</span>
          <span>:</span>
          <span>{formatX(recordingSeconds)}</span>
        </div>
        {initRecording && (
          <div className="cancel-button-container">
            <button className="cancel-button" title="Cancel recording" onClick={cancelRecording}>
            </button>
          </div>
        )}
      </div>
      <div className="start-button-container">
        {initRecording ? (
          <button
            className="start-button"
            title="Save recording"
            disabled={recordingSeconds === 0}
            onClick={saveRecording}
          >
          </button>
        ) : (
          <button className="start-button" title="Start recording" onClick={startRecording}>
          </button>
        )}
      </div>
    </div>
  );
}
