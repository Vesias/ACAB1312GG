import React from 'react';

const StrategyCreationComponent = ({ selectedMap }) => {
    if (!selectedMap) return <div>Please select a map to create a strategy.</div>;

    return (
        <div className="strategy-creation-container">
            <h2>Creating Strategy for: {selectedMap.name}</h2>
            {/* Strategy creation form or tools go here */}
        </div>
    );
};

export default StrategyCreationComponent;
