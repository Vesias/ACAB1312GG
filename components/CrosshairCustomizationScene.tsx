import { json, LoaderFunction, ActionFunction } from 'remix';
import React, { useState } from 'react';
import { Stage, Layer, Text, Circle } from 'react-konva';

interface CrosshairProps {
    size: number;
    color: string;
}

// Loader function to fetch initial settings
export const loader: LoaderFunction = async ({ request }) => {
    // Fetch initial settings, e.g., from a database or user preferences
    const settings = await fetchCrosshairSettings(); // Assume a function to fetch settings
    return json(settings);
};

// Action function to handle settings update
export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const size = parseInt(formData.get('size') as string);
    const color = formData.get('color') as string;

    // Assume a function to save settings
    await saveCrosshairSettings({ size, color });
    return null; // Redirect or send back a response
};

const CrosshairCustomizationScene: React.FC = () => {
    const [crosshairSize, setCrosshairSize] = useState<number>(20);
    const [crosshairColor, setCrosshairColor] = useState<string>('#ffffff');

    const updateCrosshairPreview = (size: number, color: string) => {
        setCrosshairSize(size);
        setCrosshairColor(color);
    };

    const saveCrosshairSettings = () => {
        console.log('Crosshair settings saved');
        // This would now be handled by the action function
    };

    return (
        <div>
            <Stage width={window.innerWidth} height={window.innerHeight - 100}>
                <Layer>
                    <Text x={100} y={50} text="Crosshair Customization" />
                    <Circle x={150} y={150} radius={crosshairSize} fill={crosshairColor} />
                </Layer>
            </Stage>
        </div>
    );
};

export default CrosshairCustomizationScene;
