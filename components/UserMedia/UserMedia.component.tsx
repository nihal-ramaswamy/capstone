import { useDispatch, useSelector } from "react-redux";
import { selectMediaState, setMediaState } from "../../store/mediaSlice";

const UserMedia = () => {
    const mediaState = useSelector(selectMediaState);
    const dispatch = useDispatch();

    return (
        <div>
            <div>
                {mediaState ? "AAAAA" : "BBBBB"}
            </div>
            <button onClick={() => dispatch(setMediaState(!mediaState))}>
                Click Here
            </button>
        </div>
    );
}

export default UserMedia;
