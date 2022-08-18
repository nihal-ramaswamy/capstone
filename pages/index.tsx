import type { NextPage } from 'next'
import UserMedia from '../components/UserMedia/UserMedia.component'
import { wrapper } from '../store/store'
import { setMediaState } from '../store/mediaSlice'

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ params }) => {
            await store.dispatch(setMediaState(false));
            console.log("State on server", store.getState());
            return {
                props: {
                    authState: false,
                },
            };
        }
);

const Home: NextPage = () => {
    return (
        <div>
            <UserMedia />
        </div>
    )
}

export default Home;
