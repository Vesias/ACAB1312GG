import { json, LoaderFunction } from 'remix';
import React, { memo, useState, useEffect, useContext, useCallback } from 'react';
import { Stage, Layer, Rect, Image, Text } from 'react-konva';
import Konva from 'konva';
import { GameStateContext } from '@/utils/GameStateContext';  // Ensure this is adapted for Remix or use alternative global state management
import useImage from 'use-image';

interface Position {
    x: number;
    y: number;
}

interface Player {
    id: string;
    position: Position;
    teamColor: string;
}

// Example of a loader that could fetch initial game data or configuration
export const loader: LoaderFunction = async ({ request }) => {
    // Fetch initial game settings or state from your backend
    const gameSettings = await fetchGameSettings();
    return json(gameSettings);
};

const GameScene = memo(() => {
    const { state, dispatch } = useContext(GameStateContext);  // Consider replacing with Remix resource routes if needed
    const [selectedMap, setSelectedMap] = useState('/maps/map1.webp');
    const [zoom, setZoom] = useState(1);
    const [mapImage] = useImage(selectedMap);
    const [playerImage] = useImage('/path/to/playerImage.png');

    const handleZoomIn = useCallback(() => setZoom(zoom => zoom * 1.1), []);
    const handleZoomOut = useCallback(() => setZoom(zoom => zoom / 1.1), []);

    const handlePlayerMove = useCallback((playerId: string, position: Position) => {
        dispatch({ type: 'MOVE_PLAYER', playerId, position });
    }, [dispatch]);

    return (
        <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
                <Image image={mapImage} />
                {/* Additional elements and interactions */}
            </Layer>
        </Stage>
    );
});

export default GameScene;
