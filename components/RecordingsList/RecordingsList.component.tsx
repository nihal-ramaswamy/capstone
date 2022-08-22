import useRecordingsList from "../../hooks/useRecordingsList.hooks";
import { RecordingsListProps } from "../../types/Audio.types";

export default function RecordingsList({ audio, setAudio }: RecordingsListProps) {
  const { recordings, deleteAudio } = useRecordingsList(audio, setAudio);

  return (
    <div className="recordings-container">
      {recordings.length > 0 ? (
        <>
          <h1>Your recordings</h1>
          <div className="recordings-list">
            {recordings.map((record) => (
              <div className="record" key={record.key}>
                <audio controls src={record.audio} />
                <div className="delete-button-container">
                  <button
                    className="delete-button"
                    title="Delete this audio"
                    onClick={() => deleteAudio(record.key)}
                  >
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="no-records">
          <span>NA</span>
        </div>
      )}
    </div>
  );
}
