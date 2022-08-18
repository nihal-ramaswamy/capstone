import { useDispatch, useSelector } from "react-redux";
import { selectMediaState, setMediaState } from "../../store/mediaSlice";
import { useState } from "react";
import Audio from "../Audio/Audio.component";
import Video from "../Video/Video.component";

const UserMedia = () => {
    const mediaState = useSelector(selectMediaState);
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [audio, setAudio] = useState(null);

    // dispatch(setMediaState(!mediaState))

    return (
        <div>
            <button onClick={() => dispatch(setMediaState(!mediaState))}>Record</button>
            <Audio />
            <Video />
        </div>
    );
}

export default UserMedia;
