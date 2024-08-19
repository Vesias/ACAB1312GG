// src/routes/mapSelection.tsx in Remix
import { json, LoaderFunction, ActionFunction, useLoaderData, redirect } from 'remix';
import React from 'react';

interface Map {
    id: number;
    name: string;
}

// Assuming an array of maps is available
const availableMaps: Map[] = [
    { id: 1, name: 'Dust II' },
    { id: 2, name: 'Inferno' },
    { id: 3, name: 'Mirage' }
];

// Loader function to provide all available maps
export const loader: LoaderFunction = async () => {
    return json({ availableMaps });
};

// Action function to handle map selection
export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const selectedMapId = formData.get('mapId');
    // Simulate storing the selected map choice (e.g., in a database or session)
    console.log(`Map selected: ${selectedMapId}`);
    return redirect('/mapConfirmation');
};

const MapSelection = () => {
    const { availableMaps } = useLoaderData<{ availableMaps: Map[] }>();

    return (
        <div>
            <h1>Select Your Map</h1>
            <form method="post">
                {availableMaps.map(map => (
                    <button key={map.id} name="mapId" value={map.id} type="submit">
                        {map.name}
                    </button>
                ))}
            </form>
        </div>
    );
};

export default MapSelection;
