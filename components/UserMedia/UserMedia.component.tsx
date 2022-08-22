import { useDispatch, useSelector } from "react-redux";
import { selectMediaState, setMediaState } from "../../store/mediaSlice";
import { useState } from "react";
import Video from "../Video/Video.component";
import Audio from "../Audio/Audio.component";

const UserMedia = () => {
    const mediaState = useSelector(selectMediaState);
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [audio, setAudio] = useState(null);

    // dispatch(setMediaState(!mediaState))

    const [userVideo, setUserVideo] = useState<string | null>(null);
    const [userAudio, setUserAudio] = useState<string | null>(null);

    return (
        <div>
            <div>
                <Video setImage = {setUserVideo} />
            </div>
            <div>
                <Audio setAudio = {setUserAudio} />
            </div>
            <button onClick={() => dispatch(setMediaState(!mediaState))}>
                Click Here
            </button>
        </div>
    );
}

export default UserMedia;
