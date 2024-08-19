// File: /app/routes/game/index.tsx
import { json, LoaderFunction, useLoaderData } from 'remix';
import React from 'react';
import { Outlet, Link } from 'remix';

interface GameConfig {
    canvasId: string;
    scenes: string[];
}

// Loader function to fetch initial game data
export const loader: LoaderFunction = async () => {
    const config: GameConfig = { canvasId: 'gameCanvas', scenes: ['preload', 'main', 'map-selection', 'game', 'hud', 'buy-menu', 'game-over'] };
    return json(config);
};

const Game = () => {
    const config = useLoaderData<GameConfig>();

    return (
        <div id="game-container">
            <h1>Game Dashboard</h1>
            <nav>
                {config.scenes.map(scene => (
                    <Link key={scene} to={scene}>{scene.replace('-', ' ').toUpperCase()}</Link>
                ))}
            </nav>
            <canvas id={config.canvasId}></canvas>
            <Outlet /> {/* Renders the current scene based on the route */}
        </div>
    );
};

export default Game;
