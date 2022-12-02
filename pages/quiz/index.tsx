import type { NextPage } from "next";
import UserMedia from "../../components/UserMedia/UserMedia.component";
import { wrapper} from "../../store/store"
import { setMediaState } from "../../store/mediaSlice";
import { setTimerState } from "../../store/timer";


export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ params }) => {
            await store.dispatch(setMediaState(false));
            await store.dispatch(setTimerState(false));
            console.log("State on server", store.getState());
            return {
                props: {
                    authState: false,
                    timerState: false,
                },
            };
        }
);


const Quiz: NextPage = () => {
    return (
        <div>
            <UserMedia />
        </div>
    )
}

export default Quiz;
