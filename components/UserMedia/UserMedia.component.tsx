import { useDispatch, useSelector } from "react-redux";
import { selectMediaState, setMediaState } from "../../store/mediaSlice";
import { useEffect, useState } from "react";
import Video from "../Video/Video.component";
import Audio from "../Audio/Audio.component";
import { writeUserData } from "../../db/db";

const UserMedia = () => {
    const mediaState = useSelector(selectMediaState);
    const dispatch = useDispatch();

    const [userVideo, setUserVideo] = useState<string | null>(null);
    const [userAudio, setUserAudio] = useState<string | null>(null);

    const saveToDb = async () => {
        if (userAudio == null || userVideo == null) {
            alert(`Video or Audio is null. ${userAudio == null} ${userVideo == null}`);
            return;
        }
        const res = await writeUserData("AAAA", "BBBB", "email", userVideo, userAudio);
        dispatch(setMediaState(!mediaState));
        console.log(res);
    };

    return (
        <div>
            <div>
                <Video setImage = {setUserVideo} />
            </div>
            <div>
                <Audio setAudio = {setUserAudio} />
            </div>
            <button onClick={() => dispatch(setMediaState(true))}>
                Click Here
            </button>
            <button onClick={() => saveToDb()}>
                Save to DB
            </button>
        </div>
    );
}

export default UserMedia;
