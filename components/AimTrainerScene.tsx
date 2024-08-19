// File: src/app/components/AimTrainerScene.tsx
import React, { useState } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import { json, LoaderFunction } from '@remix-run/data';
import { Request } from "express"; // Assuming you're using Express.js

// Assuming the use of an environment variable or similar to manage assets
const targetImagePath = process.env.TARGET_IMAGE_PATH || '/assets/target.png';

// Loader function to fetch any necessary configuration or data
export const loader: LoaderFunction = async ({ request }: { request: Request }) => {
    // This could also include fetching user session data or game settings if applicable
    return json({ targetImagePath });
};

const AimTrainerScene: React.FC = () => {
    const [targetPos, setTargetPos] = useState({ x: 400, y: 300 });
    const [targetImage] = useImage(targetImagePath);

    const sceneWidth = 800;
    const sceneHeight = 600;
    const targetWidth = 100;  // Assuming target image size
    const targetHeight = 100;  // Assuming target image size

    const resetTarget = () => {
        const newX = Math.random() * (sceneWidth - targetWidth) + targetWidth / 2;
        const newY = Math.random() * (sceneHeight - targetHeight) + targetHeight / 2;
        setTargetPos({ x: newX, y: newY });
    };

    return (
        <Stage width={sceneWidth} height={sceneHeight}>
            <Layer>
                <Image
                    image={targetImage}
                    x={targetPos.x}
                    y={targetPos.y}
                    width={targetWidth}
                    height={targetHeight}
                    onClick={resetTarget}
                />
            </Layer>
        </Stage>
    );
};

export default AimTrainerScene;