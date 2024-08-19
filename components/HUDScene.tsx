import { json, LoaderFunction } from 'remix';
import React, { useState, useEffect } from 'react';
import { Stage, Layer, Text, Rect } from 'react-konva';
import useImage from 'use-image';
import PlayerDisplay from '../components/PlayerDisplay';

interface Player {
    id: string;
    team: string;
    health: number;
    weapon: string;
    weaponIcon: string;
    x: number;
    y: number;
}

interface PlayerDisplayProps {
    player: Player;
    kevlarIcon: string | HTMLImageElement;
    kevlarHelmetIcon: string | HTMLImageElement;
    onPurchase: (playerId: string, item: string) => void;
}

// Loader function to fetch initial player data
export const loader: LoaderFunction = async ({ request }) => {
    const playersData = await fetchPlayersData();  // Assume a function that fetches player data
    return json({ players: playersData });
};

const HUDScene: React.FC = () => {
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Stage width={windowSize.width} height={windowSize.height}>
            <Layer>
                {/* Player displays and other HUD elements */}
            </Layer>
        </Stage>
    );
};

export default HUDScene;
