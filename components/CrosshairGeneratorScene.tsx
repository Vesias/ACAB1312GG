import { json, LoaderFunction, ActionFunction } from 'remix';
import React, { useState } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

// Loader function to fetch initial settings
export const loader: LoaderFunction = async ({ request }) => {
    // Fetch initial settings, e.g., default color and size
    const settings = await fetchInitialCrosshairSettings(); // Assume a function to fetch settings
    return json(settings);
};

// Action function to save color changes
export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const color = formData.get('color') as string;

    // Assume a function to save the new color
    await saveCrosshairColor(color);
    return null; // Redirect or send back a response
};

const CrosshairGeneratorScene: React.FC = () => {
    const [crosshairColor, setCrosshairColor] = useState<string>('#FFFFFF');
    const [crosshairSize, setCrosshairSize] = useState<number>(5);

    const changeColor = () => {
        const randomColor: string = '#' + Math.floor(Math.random() * 16777215).toString(16);
        setCrosshairColor(randomColor);
    };

    return (
        <div>
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    <Rect
                        x={window.innerWidth / 2 - crosshairSize / 2}
                        y={window.innerHeight / 2 - crosshairSize / 2}
                        width={crosshairSize}
                        height={crosshairSize}
                        fill={crosshairColor}
                    />
                    <Text
                        x={100}
                        y={50}
                        text="Click to change crosshair color"
                        onClick={changeColor}
                    />
                </Layer>
            </Stage>
        </div>
    );
};

export default CrosshairGeneratorScene;
