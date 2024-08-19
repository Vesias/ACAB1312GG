// src/routes/api/economy.ts in Remix
import { json, LoaderFunction, ActionFunction } from 'remix';
import { Economy } from '~/models/Economy';

const gameEconomy = new Economy();

export const loader: LoaderFunction = async ({ params }) => {
    // Assuming we can fetch a playerId from params or some other way
    const playerId = params.playerId;
    const playerMoney = gameEconomy.getPlayerMoney(playerId);
    return json({ playerId, playerMoney });
};

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const playerId = formData.get('playerId') as string;
    const amount = parseInt(formData.get('amount') as string);
    const type = formData.get('type') as string;

    switch (type) {
        case 'setMoney':
            gameEconomy.setPlayerMoney(playerId, amount);
            break;
        case 'updateMoney':
            gameEconomy.updatePlayerMoney(playerId, amount);
            break;
        case 'rewardKill':
            gameEconomy.rewardKill(playerId, amount);
            break;
    }

    return json({ success: true });
};
