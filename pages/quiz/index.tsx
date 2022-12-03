import type { NextPage } from "next";
import UserMedia from "../../components/UserMedia/UserMedia.component";
import { wrapper} from "../../store/store"
import { setMediaState } from "../../store/mediaSlice";
import { setTimerState } from "../../store/timer";
import { getAuth } from "firebase/auth";
import React from "react";
import Router from "next/router";


export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ params }) => {
            store.dispatch(setMediaState(false));
            store.dispatch(setTimerState(false));
            return {
                props: {
                    authState: false,
                    timerState: false,
                },
            };
        }
);


const Quiz: NextPage = () => {
  const auth = getAuth();
  
  React.useEffect(() => {
    if (auth.currentUser === null || auth.currentUser.uid === null || auth.currentUser.email === null) {
      Router.push("/auth/signIn");
      return;
    }
    if (auth.currentUser ===undefined || auth.currentUser.uid === undefined || auth.currentUser.email === undefined) {
      Router.push("/auth/signIn");
      return;
    }
  }, [auth.currentUser]);

    return (
        <div>
            <UserMedia uid = {auth.currentUser?.uid} email = {auth.currentUser?.email}/>
        </div>
    )
}

export default Quiz;
