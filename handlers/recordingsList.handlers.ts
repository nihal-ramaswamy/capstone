import { SetRecordings } from "../types/Audio.types";

export const deleteAudio = (audioKey: string, setRecordings: SetRecordings) => {
    setRecordings((prevState) => prevState.filter((record) => record.key !== audioKey));
}
