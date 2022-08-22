import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { deleteAudio } from "../handlers/recordingsList.handlers";
import { Audio } from "../types/Audio.types";
import generateKey from "../utils/generateKeys.utils";

export default function useRecording(audio: string | null, setAudio: Dispatch<SetStateAction<string | null>>) {
    const [recordings, setRecordings] = useState<Audio[]>([]);

    useEffect(() => {
        if (audio)
            setRecordings((prevState: Audio[]) => {
                return [...prevState, { key: generateKey(), audio }];
            });
            setAudio(audio);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [audio]);

    return {
        recordings,
        deleteAudio: (audioKey: string) => deleteAudio(audioKey, setRecordings),
    };
}
