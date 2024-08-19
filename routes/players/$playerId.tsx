// File: src/app/routes/players/$playerId.tsx
import { json, useLoaderData } from 'remix';
import  getPlayerData  from '../utils/playerUtils'; // A utility to fetch player data from a database or API

export const loader: LoaderFunction = async ({ params }: { params: { playerId: string } }) => {
    const playerData = await getPlayerData(params.playerId);
    return json(playerData);
};