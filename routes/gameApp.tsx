// src/routes/gameApp.tsx in Remix
import { json, LoaderFunction, ActionFunction, useLoaderData } from 'remix';
import React from 'react';
import { Stage, Layer, Rect } from 'react-konva';

interface Player {
    id: number;
    name: string;
    health: number;
    armor: number;
    isAlive: boolean;
}

// Load player data
export const loader: LoaderFunction = async ({ request }) => {
    const players = await fetchPlayers(); // This would fetch player data from a server
    return json({ players });
};

// Handle player actions like 'attack'
export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const playerId = formData.get('playerId');
    const actionType = formData.get('actionType');

    // Handle different actions based on actionType
    return null;  // Send back a response or redirect
};

const PlayerGraphic = ({ player }: { player: Player }) => (
    <Rect
        x={100}
        y={player.id * 60}
        width={50}
        height={50}
        fill={player.isAlive ? 'green' : 'red'}
        shadowBlur={5}
    />
);

const PlayerStats = ({ player }: { player: Player }) => (
    <div key={player.id} className="stat-card bg-gray-200 p-4">
        <p>{player.name}</p>
        <p>{player.health}</p>
        <p>{player.armor}</p>
    </div>
);

const GameApp = () => {
    const { players } = useLoaderData();

    return (
        <div className="container mx-auto p-4">
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    {players.map((player: Player) => (
                        <PlayerGraphic key={player.id} player={player} />
                    ))}
                </Layer>
            </Stage>
            <div className="grid grid-cols-4 gap-4 mt-4">
                {players.map((player: Player) => <PlayerStats key={player.id} player={player} />)}
            </div>
            {/* Actions would be handled via form submission or API requests */}
        </div>
    );
};

export default GameApp;
// src/routes/gameApp.tsx in Remix
import { json, LoaderFunction, ActionFunction, useLoaderData } from 'remix';
import React from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

interface Player {
    id: number;
    name: string;
    health: number;
    armor: number;
    isAlive: boolean;
}

interface GameData {
    players: Player[];
}

// Loader function to fetch player data
export const loader: LoaderFunction = async () => {
    // This could be a call to your backend API to fetch player data
    const players: Player[] = await fetchPlayers();
    return json({ players });
};

// Action function to handle in-game actions like 'Angriff'
export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const playerId = formData.get('playerId') as string;
    const actionType = formData.get('actionType') as string;
    // Handle actions here, e.g., update player stats
    return json({ success: true });
};

const GameApp = () => {
    const { players } = useLoaderData<GameData>();

    return (
        <div>
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    {players.map(player => (
                        <Rect key={player.id}
                              x={100}
                              y={player.id * 60}
                              width={50}
                              height={50}
                              fill={player.isAlive ? 'green' : 'red'}
                              shadowBlur={5}
                              onClick={() => console.log(`Player ${player.id} clicked`)} />
                    ))}
                </Layer>
            </Stage>
            {/* Additional UI components here */}
        </div>
    );
};

export default GameApp;
// src/routes/gameApp.tsx in Remix
import { json, LoaderFunction, ActionFunction, useLoaderData } from 'remix';
import React from 'react';

interface Player {
    id: number;
    name: string;
    health: number;
    armor: number;
}

interface GameState {
    players: Player[];
}

// Loader function to fetch player data
export const loader: LoaderFunction = async () => {
    const players = await fetchPlayers();  // Assume this fetches player data from a backend API
    return json({ players });
};

const PlayerStats = ({ player }: { player: Player }) => {
    return (
        <div key={player.id} className="stat-card bg-gray-200 p-4">
            <p>{player.name}</p>
            <p>{player.health}</p>
            <p>{player.armor}</p>
        </div>
    );
};

const GameApp = () => {
    const { players } = useLoaderData<GameState>();

    return (
        <div>
            {players.map((player: Player) => (
                <PlayerStats key={player.id} player={player} />
            ))}
        </div>
    );
};

export default GameApp;
// src/routes/gameApp.tsx in Remix
import { json, LoaderFunction, ActionFunction, useLoaderData } from 'remix';
import React from 'react';

interface Player {
    id: number;
    name: string;
    health: number;
    armor: number;
}

interface GameState {
    players: Player[];
}

// Loader function to fetch player data
export const loader: LoaderFunction = async () => {
    const players = await fetchPlayers();  // Assume this fetches player data from a backend API
    return json({ players });
};

const PlayerStats = ({ player }: { player: Player }) => {
    return (
        <div key={player.id} className="stat-card bg-gray-200 p-4">
            <p>{player.name}</p>
            <p>{player.health}</p>
            <p>{player.armor}</p>
        </div>
    );
};

const GameApp = () => {
    const { players } = useLoaderData<GameState>();

    return (
        <div>
            {players.map((player: Player) => (
                <PlayerStats key={player.id} player={player} />
            ))}
        </div>
    );
};

export default GameApp;
