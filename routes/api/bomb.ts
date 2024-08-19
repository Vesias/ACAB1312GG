// src/routes/api/bomb.ts in Remix
import { json, ActionFunction } from 'remix';
import { Bomb } from '~/models/Bomb';

// Assuming an instance of Bomb could be managed server-side or through session storage
const bomb = new Bomb();

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const actionType = formData.get('actionType') as string;

    switch (actionType) {
        case 'activate':
            bomb.activate();
            break;
        case 'deactivate':
            bomb.deactivate();
            break;
        default:
            throw new Error('Unsupported action type');
    }

    // Return the current state of the bomb (active/inactive and remaining time)
    return json({ isActive: bomb.isActive(), timer: bomb.getTimer() });
};

export default bomb;
