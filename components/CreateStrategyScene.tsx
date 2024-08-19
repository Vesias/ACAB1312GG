import React, { useState } from 'react';
import MapSelectionComponent from './MapSelectionComponent';
import StrategyCreationComponent from './StrategyCreationComponent';

const CreateStrategyScene = () => {
    const [selectedMap, setSelectedMap] = useState(null);

    const handleSelectMap = (map) => {
        setSelectedMap(map);
    };

    return (
        <div>
            {!selectedMap ? (
        <MapSelectionComponent onSelectMap={handleSelectMap} />
) : (
        <StrategyCreationComponent selectedMap={selectedMap} />
)}
    </div>
);
};

export default CreateStrategyScene;
