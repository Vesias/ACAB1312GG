// src/routes/MapPreviewComponent.tsx in Remix
import { json, LoaderFunction, useLoaderData } from 'remix';
import React from 'react';

interface MapPreviewProps {
    mapId: number;
    lowQualitySrc: string;
    highQualitySrc: string;
}

// Loader function to provide image sources based on map ID
export const loader: LoaderFunction = async ({ params }) => {
    const mapId = parseInt(params.mapId);
    const lowQualitySrc = `/public/assets/maps/map${mapId}preview.jpg`;
    const highQualitySrc = `/public/assets/maps/map${mapId}.webp`;
    return json({ mapId, lowQualitySrc, highQualitySrc });
};

const MapPreviewComponent = () => {
    const { lowQualitySrc, highQualitySrc } = useLoaderData<MapPreviewProps>();

    return (
        <div style={{ margin: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <img src={lowQualitySrc} alt={`Map Preview ${lowQualitySrc}`} style={{ width: '100%', height: 'auto' }} loading="lazy" />
            <img src={highQualitySrc} alt={`Detailed Map ${highQualitySrc}`} style={{ width: '100%', height: 'auto' }} loading="lazy" />
        </div>
    );
};

export default MapPreviewComponent;
// src/components/MapPreviewComponent.tsx
import React from 'react';
import { Rect, Text } from 'react-konva';
import { MapType } from '../types';

interface MapPreviewComponentProps {
    map: MapType;
    x: number;
    y: number;
    onClick: () => void;
}

const MapPreviewComponent: React.FC<MapPreviewComponentProps> = ({ map, x, y, onClick }) => {
    return (
        <Rect
            x={x}
            y={y}
            width={90}
            height={50}
            fill={'lightblue'}
            onClick={onClick}
            shadowBlur={5}
        >
            <Text text={map.name} fontSize={15} />
        </Rect>
    );
};

export default MapPreviewComponent;
