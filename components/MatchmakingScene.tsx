import { json, LoaderFunction, ActionFunction } from 'remix';
import React, { useState } from 'react';
import styled from 'styled-components';

interface Map {
    id: string;
    name: string;
}

const MatchmakingContainer = styled.div`
    padding: 20px;
    background-color: #f2f2f2;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

interface MatchmakingSceneProps {
    onMapSelected: (mapId: string) => void;
}

// Loader function to fetch map data
export const loader: LoaderFunction = async ({ request }) => {
    const response = await fetch('https://api.example.com/maps');
    const maps: Map[] = await response.json();
    return json({ maps });
};

const MatchmakingScene: React.FC<MatchmakingSceneProps> = ({ onMapSelected }) => {
    const [maps, setMaps] = useState<Map[]>([]);
    const [selectedMapId, setSelectedMapId] = useState<string | null>(null);

    return (
        <MatchmakingContainer>
            <h1>Select a Map</h1>
            {maps.map(map => (
                <button key={map.id} onClick={() => onMapSelected(map.id)}>
                    {map.name}
                </button>
            ))}
        </MatchmakingContainer>
    );
};

export default MatchmakingScene;
