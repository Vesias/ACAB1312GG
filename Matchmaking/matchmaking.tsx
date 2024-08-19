import React, { useState, useEffect } from 'react';
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

const Matchmaking: React.FC<MatchmakingSceneProps> = ({ onMapSelected }) => {
    const [maps, setMaps] = useState<Map[]>([]);
    const [selectedMapId, setSelectedMapId] = useState<string | null>(null);
    const [isRandomMap, setIsRandomMap] = useState(false);
    const [round, setRound] = useState(1);

    useEffect(() => {
        const fetchMaps = async () => {
            const response = await fetch('/path/to/mapdata.json');
            const data = await response.json();
            setMaps(data);
        };
        fetchMaps();
    }, []);

    const handleMapSelection = (mapId: string) => {
        setSelectedMapId(mapId);
        onMapSelected(mapId);
    };

    const handleEndRound = () => {
        if (round === 1) {
            setRound(round + 1);
        } else {
            setIsRandomMap(false);
            setSelectedMapId(null);
            setRound(1);
        }
    };

    return (
        <MatchmakingContainer>
            <h1>Select a Map</h1>
            {maps.map(map => (
                <div key={map.id} onClick={() => handleMapSelection(map.id)}>
                    {map.name}
                </div>
            ))}
            {selectedMapId && (
                <button onClick={handleEndRound}>End Round</button>
            )}
        </MatchmakingContainer>
    );
};

export default Matchmaking;
