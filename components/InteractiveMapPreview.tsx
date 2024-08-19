// src/components/InteractiveMapPreview.tsx
import React from 'react';
import { Rect, Text, Group, Stage, Layer } from 'react-konva';
import { MapType } from '../types';

interface InteractiveMapPreviewProps {
    map: MapType;
    x: number;
    y: number;
    onClick: () => void;
}

const InteractiveMapPreview: React.FC<InteractiveMapPreviewProps> = ({ map, x, y, onClick }) => {
    return (
        <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
                <Group onClick={onClick} onTap={onClick}>
                    <Rect
                        x={x}
                        y={y}
                        width={90}
                        height={50}
                        fill={'lightblue'}
                        shadowBlur={5}
                    />
                    <Text
                        x={x + 5}
                        y={y + 15}
                        text={map.name}
                        fontSize={15}
                    />
                </Group>
            </Layer>
        </Stage>
    );
};

export default InteractiveMapPreview;
