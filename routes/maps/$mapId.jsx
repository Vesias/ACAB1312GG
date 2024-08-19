// src/routes/maps/$mapId.jsx in Remix
import { json, LoaderFunction } from 'remix';
import MapPreviewComponent from '~/components/MapPreviewComponent'; // Adapted to ES Module syntax and import path

export const loader: LoaderFunction = async ({ params }) => {
    const mapId = params.mapId;
    const mapDetails = getMapDetails(mapId); // Function to fetch map details from a database or API
    return json(mapDetails);
};

const MapPage = () => {
    const mapDetails = useLoaderData();
    return (
        <div>
            <h1>Map Preview: {mapDetails.name}</h1>
            <MapPreviewComponent mapId={mapDetails.id} />
        </div>
    );
};

export default MapPage;
