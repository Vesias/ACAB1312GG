// playerStats.tsx
import { json, LoaderFunction, ActionFunction, redirect } from 'remix';
import { useLoaderData } from '@remix-run/react';
import { getPlayerStats, updatePlayerStats } from '../services/playerService';

export const loader: LoaderFunction = async ({ params }: { params: { playerId: string } }) => {
    const stats = await getPlayerStats(params.playerId);
    return json(stats);
};

export const action: ActionFunction = async ({ request, params }: { request: Request, params: { playerId: string } }) => {
    const formData = await request.formData();
    const updates = {
        score: formData.get('score'),
        gamesPlayed: formData.get('gamesPlayed')
    };
    await updatePlayerStats(params.playerId, updates);
    return redirect(`/players/${params.playerId}/stats`);
};

function PlayerStats() {
    const stats = useLoaderData();
    return (
        <div>
            <h1>Player Statistics</h1>
            <form method="post">
                <label htmlFor="score">Score:</label>
                <input type="number" id="score" name="score" defaultValue={stats.score} />
                <label htmlFor="gamesPlayed">Games Played:</label>
                <input type="number" id="gamesPlayed" name="gamesPlayed" defaultValue={stats.gamesPlayed} />
                <button type="submit">Update Stats</button>
            </form>
        </div>
    );
}

export default PlayerStats;