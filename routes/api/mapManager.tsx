// File: src/app/routes/api/mapManager.tsx
import React from 'react';

const MapManager: React.FC = () => {
    // Define map and handleMapSelection
    const map = { id: '1', name: 'Map 1' };
    const handleMapSelection = (id: string) => {
        console.log(`Map with id ${id} selected`);
    };

    return (
        <div>
            <h1>Select a Map</h1>
            <button key={map.id} onClick={() => handleMapSelection(map.id)}>
                {map.name}
            </button>
        </div>
    );
};

export default MapManager;