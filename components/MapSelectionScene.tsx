import { json, LoaderFunction, useLoaderData } from 'remix';
import React from 'react';
import { Stage, Layer } from 'react-konva';
import { MapPreviewComponent } from '@/Game/MapPreviewComponent';

interface MapType {
    id: string;
    name: string;
    // other properties...
}

interface MapData {
    maps: MapType[];
}

// Loader function to fetch map data
export const loader: LoaderFunction = async ({ request }) => {
    const mapsData: MapData = await fetchMapData(); // Ensure this function is robust and handles exceptions
    return json(mapsData);
};

interface MapSelectionSceneProps {
    onMapSelected: (mapName: string) => void;
}

const MapSelectionScene: React.FC<MapSelectionSceneProps> = ({ onMapSelected }) => {
    const { maps } = useLoaderData<MapData>();

    return (
        <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
                {maps.map((map, index) => (
                    <MapPreviewComponent
                        key={map.id}
                        map={map}
                        x={calculateXPosition(index)}
                        y={calculateYPosition(index)}
                        onClick={() => onMapSelected(map.name)}
                    />
                ))}
            </Layer>
        </Stage>
    );
};

function calculateXPosition(index: number): number {
    // Your calculation logic here
    return index * 100;  // example placeholder
}

function calculateYPosition(index: number): number {
    // Your calculation logic here
    return 100;  // example placeholder
}

export default MapSelectionScene;
