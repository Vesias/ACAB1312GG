// File: src/app/routes/mapManager.tsx
import { json, useLoaderData } from '@remix-run/data';
import { LoaderFunction, ActionFunction } from '@remix-run/core';
import { getMaps, getMapById } from '../utils/mapUtils'; // Ensure the file exists and is correctly exported

interface Map {
    id: number;
    name: string;
    description: string;
}

interface MapManagerProps {
    maps: Map[];
    selectedMap: Map | null;
}

// Loader function to fetch all maps
export const loader: LoaderFunction = async () => {
    const maps = await getMaps();
    return json({ maps, selectedMap: null });
};

// Action function to select a map
export const action: ActionFunction = async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const mapId = parseInt(formData.get('mapId') as string);
    const selectedMap = await getMapById(mapId);
    if (!selectedMap) {
        throw new Response('Map not found', { status: 404 });
    }
    return json({ selectedMap });
};

const MapManager = () => {
    const { maps, selectedMap } = useLoaderData<MapManagerProps>();
    const selectMap = (id: number) => {
        // Define the function to select a map
    };

    return (
        <div>
            <h1>Map Manager</h1>
            {maps.map((map: Map) => (
                <button key={map.id} onClick={() => selectMap(map.id)}>
                    {map.name}
                </button>
            ))}
            {selectedMap && (
                <div>
                    <h2>Selected Map: {selectedMap.name}</h2>
                    <p>{selectedMap.description}</p>
                </div>
            )}
        </div>
    );
};

export default MapManager;