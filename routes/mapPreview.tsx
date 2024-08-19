// src/routes/mapPreview.tsx
import { LoaderFunction, useLoaderData, json } from 'remix';
import { MAP_PREVIEW_FORMATS } from '../constants/mapConstants';

interface MapPreviewProps {
    mapId: number;
    imagePath: string;
}

export const loader: LoaderFunction = async ({ params }) => {
    const mapId = parseInt(params.mapId, 10);
    if (isNaN(mapId)) {
        throw new Response("Not Found", { status: 404 });
    }
    const format = MAP_PREVIEW_FORMATS[mapId] || 'jpg'; // Default to 'jpg' if format not specified
    const imagePath = `/assets/maps/map${mapId}.${format}`;
    return json({ mapId, imagePath });
};

const MapPreview = () => {
    const { imagePath } = useLoaderData<MapPreviewProps>();

    return (
        <div>
            <h1>Map Preview</h1>
            <img src={imagePath} alt="Map preview" />
        </div>
    );
};

export default MapPreview;
