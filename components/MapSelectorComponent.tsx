import React from 'react';
import { useMaps } from '../utils/MapContext';  // Ensure the path to MapContext is correct

const MapSelectorComponent = () => {
    const mapManager = useMaps();
    const maps = mapManager.getAllMaps();

    return (
        <div>
            {maps.map(map => (
                <div key={map.id} onClick={() => mapManager.selectMapById(map.id)}>
                    <img src={map.previewImage} alt={`Preview of ${map.name}`} />
                    <div>{map.name}</div>
                </div>
            ))}
        </div>
    );
};

export default MapSelectorComponent;
