// src/app/routes/gameSettings.tsx
import { json, LoaderFunction, ActionFunction, useLoaderData, redirect } from 'remix';
import { getGameSettings, updateGameSettings } from '~/services/gameService';

// Loader to fetch game settings
export const loader: LoaderFunction = async () => {
    const settings = await getGameSettings();
    return json(settings);
};

// Action to update game settings
export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateGameSettings(updates);
    return redirect('/gameSettings');
};

function GameSettings() {
    const settings = useLoaderData();
    return (
        <form method="post">
            <label htmlFor="difficulty">Difficulty:</label>
            <input type="text" id="difficulty" name="difficulty" defaultValue={settings.difficulty} />
            <button type="submit">Update Settings</button>
        </form>
    );
}

export default GameSettings;
