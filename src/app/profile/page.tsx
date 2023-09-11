import { myfetch } from '@/myfetch';
import { CONFIG } from '../../../config';

const Profile = async () => {
    const data = await myfetch(`${CONFIG.API_URL}/auth/session`)
        .server()
        .GET()
        .data();
    const session = data?.payload ?? null;

    return (
        <main className="min-h-screen pt-navbar">
            <h1>Profile page</h1>
            <p>{JSON.stringify(session)}</p>
        </main>
    );
};

export default Profile;
