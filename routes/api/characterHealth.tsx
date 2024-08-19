// src/routes/api/characterHealth.tsx in Remix
import { json, LoaderFunction, ActionFunction } from 'remix';
import HealthComponent from '~/components/HealthComponent'; // Path adjusted to where HealthComponent is now located

// Loader function to get the health of a character
export const loader: LoaderFunction = async ({ params }) => {
    // Dummy character ID and health
    const characterId = params.characterId;
    const health = new HealthComponent(100); // Assume starting health is 100
    return json({ characterId, health: health.getValue() });
};

// Action function to update health
export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const healthChange = parseInt(formData.get('healthChange') as string);
    const health = new HealthComponent(100); // Assume starting health is 100

    health.setValue(health.getValue() + healthChange);
    return json({ newHealth: health.getValue() });
};

// Using in a component
const CharacterHealth = () => {
    const { characterId, health } = useLoaderData();

    return (
        <div>
            <h1>Character Health</h1>
            <p>Character ID: {characterId}</p>
            <p>Current Health: {health}</p>
            {/* Additional UI and interactions */}
        </div>
    );
};

export default CharacterHealth;
