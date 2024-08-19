import { LoaderFunction } from 'remix';
import { getPlayerData } from '~/services/playerService';

export const loader: LoaderFunction = async ({ params }) => {
    const playerData = await getPlayerData(params.playerId);
    return playerData;
};

function PlayerProfile() {
    const data = useLoaderData();
    return (
        <div>
            <h1>Player Profile: {data.name}</h1>
            <p>Level: {data.level}</p>
            <p>Experience: {data.experience}</p>
            {/* Additional player details */}
        </div>
    );
}

export default PlayerProfile;
