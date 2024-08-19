// src/routes/api/gameService.ts in Remix
import { json, LoaderFunction, ActionFunction } from 'remix';
import { GameService } from '~/services/GameService';

// Assuming the GameService class is adjusted to be compatible with server-side operations
const gameService = new GameService();

// Loader to get the current game state
export const loader: LoaderFunction = async () => {
    const gameState = gameService.getGameState();
    return json(gameState);
};

// Action to handle game interactions
export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const actionType = formData.get('actionType');
    switch (actionType) {
        case 'updatePlayerPosition':
            const x = parseFloat(formData.get('x') as string);
            const y = parseFloat(formData.get('y') as string);
            gameService.updatePlayerPosition({ x, y });
            break;
        case 'attack':
            const enemyId = formData.get('enemyId') as string;
            gameService.attackEnemy(enemyId);
            break;
    }
    return null;
};

// Additional methods in GameService might handle specific game mechanics like player movement and attacking
