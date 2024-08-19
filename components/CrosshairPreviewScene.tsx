import { json, LoaderFunction, ActionFunction } from 'remix';
import React, { useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';

interface CrosshairProps {
    color: string;
    size: number;
    strokeWidth: number;
}

// Loader function to fetch initial crosshair settings
export const loader: LoaderFunction = async ({ request }) => {
    // Assume a function to fetch initial settings
    const settings = await fetchInitialCrosshairSettings(); // Fetch settings from a database or external service
    return json(settings);
};

// Action function to save crosshair settings
export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const color = formData.get('color') as string;
    const size = parseInt(formData.get('size') as string);
    const strokeWidth = parseInt(formData.get('strokeWidth') as string);

    // Assume a function to save the new settings
    await saveCrosshairSettings({ color, size, strokeWidth });
    return null; // Redirect or send back a response
};

const CrosshairPreviewScene: React.FC = () => {
    const [crosshairProps, setCrosshairProps] = useState<CrosshairProps>({
        color: 'red',
        size: 20,
        strokeWidth: 4
    });

    const saveCrosshairSettings = () => {
        console.log('Crosshair settings saved');
        // This action might now be triggered by the action function
    };

    return (
        <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
                <Line
                    x={window.innerWidth / 2}
                    y={window.innerHeight / 2}
                    points={[-crosshairProps.size, 0, crosshairProps.size, 0, 0, 0, 0, -crosshairProps.size, 0, crosshairProps.size]}
                    stroke={crosshairProps.color}
                    strokeWidth={crosshairProps.strokeWidth}
                />
            </Layer>
        </Stage>
    );
};

export default CrosshairPreviewScene;
