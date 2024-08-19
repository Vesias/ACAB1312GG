// src/components/StyledMapSelectionComponent.tsx
import React from 'react';
import styled from 'styled-components';
import useMaps from '@/context/MapContext';

// Assuming Map is defined as follows:
interface Map {
    id: string;
    imageUrl: string;
    name: string;
}

const MapContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
`;

const MapItem = styled.div`
    margin: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 200px;
    text-align: center;
    cursor: pointer;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover, &:focus {
        transform: scale(1.05);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
`;

const MapImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 5px;
`;

const MapName = styled.div`
    margin-top: 8px;
    font-size: 16px;
    color: #333;
`;

interface MapSelectionComponentProps {
    onSelectMap: (mapId: string) => void;
}

const StyledMapSelectionComponent: React.FC<MapSelectionComponentProps> = ({ onSelectMap }) => {
    const { maps } = useMaps();

    return (
        <MapContainer>
            {maps.map((map: Map) => (
                <MapItem key={map.id} onClick={() => onSelectMap(map.id)}>
                    <MapImage src={map.imageUrl} alt={map.name} />
                    <MapName>{map.name}</MapName>
                </MapItem>
            ))}
        </MapContainer>
    );
};

export default StyledMapSelectionComponent;
