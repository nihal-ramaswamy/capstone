import { useState, useEffect } from "react";
import { deleteAudio } from "../handlers/recordingsList.handlers";
import { Audio } from "../types/Audio.types";
import generateKey from "../utils/generateKeys.utils";

export default function useRecordingsList(audio: string | null) {
    const [recordings, setRecordings] = useState<Audio[]>([]);

    useEffect(() => {
        if (audio)
            setRecordings((prevState: Audio[]) => {
                return [...prevState, { key: generateKey(), audio }];
            });
    }, [audio]);

    return {
        recordings,
        deleteAudio: (audioKey: string) => deleteAudio(audioKey, setRecordings),
    };
}
