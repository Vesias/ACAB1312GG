// src/routes/maps.tsx in Remix
import { json, LoaderFunction, ActionFunction, useLoaderData, useFetcher } from 'remix';
import React from 'react';
import { Maps } from '~/utils/Maps'; // Assuming the Maps class is exported and adapted for use here

interface Map {
    id: number;
    name: string;
    description: string;
    vetoed: boolean;
}

export const loader: LoaderFunction = async () => {
    const mapManager = new Maps();
    const maps = mapManager.getNonVetoedMaps();
    return json({ maps });
};

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const mapId = parseInt(formData.get('mapId') as string);
    const mapManager = new Maps();
    mapManager.vetoMapById(mapId);
    return json({ success: true });
};

const MapList = () => {
    const { maps } = useLoaderData<{ maps: Map[] }>();
    const fetcher = useFetcher();

    return (
        <div>
            {maps.map(map => (
                <div key={map.id}>
                    <h3>{map.name}</h3>
                    <p>{map.description}</p>
                    {!map.vetoed && (
                        <fetcher.Form method="post">
                            <input type="hidden" name="mapId" value={map.id.toString()} />
                            <button type="submit">Veto</button>
                        </fetcher.Form>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MapList;
// src/routes/maps.tsx
import { json, LoaderFunction, useLoaderData } from 'remix';
import React from 'react';
import { Stage, Layer } from 'react-konva';
import MapPreviewComponent from '../components/MapPreviewComponent';
import { MapType, MapData } from '../types';

export const loader: LoaderFunction = async () => {
    const response = await fetch('https://example.com/api/maps');
    const mapsData: MapData = await response.json();
    return json(mapsData);
};

interface MapSelectionSceneProps {
    onMapSelected: (mapName: string) => void;
}

export default function MapSelectionScene({ onMapSelected }: MapSelectionSceneProps) {
    const { maps } = useLoaderData<MapData>();

    return (
        <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
                {maps.map((map, index) => (
                    <MapPreviewComponent
                        key={map.id}
                        map={map}
                        x={100 * index}
                        y={100}
                        onClick={() => onMapSelected(map.name)}
                    />
                ))}
            </Layer>
        </Stage>
    );
}
