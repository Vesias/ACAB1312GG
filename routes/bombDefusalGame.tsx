// bombDefusalGame.tsx
import { useState, useEffect } from 'react';
import { json, LoaderFunction, ActionFunction } from 'remix';
import { useLoaderData } from '@remix-run/react';

interface GameData {
    bombTimer: number;
}

// Loader function to initialize or fetch the game state
export const loader: LoaderFunction = async () => {
    // Assume an initial state is fetched from a server or session storage
    const bombTimer = 30;  // Default starting timer
    return json({ bombTimer });
};

// Action function to handle game restarts
export const action: ActionFunction = async () => {
    // Reset the game state on the server
    const bombTimer = 30;  // Reset timer to 30 seconds
    return json({ bombTimer });
};

const BombDefusalGame = () => {
    const { bombTimer: initialTimer } = useLoaderData<GameData>();
    const [bombTimer, setBombTimer] = useState<number>(initialTimer);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout> | null = null;

        if (bombTimer > 0) {
            timer = setTimeout(() => {
                setBombTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            console.log("The bomb has exploded. Game over.");
            // Here, we could trigger an action to the server to log the game over event
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [bombTimer]);

    const restartGame = (): void => {
        // Here, you might want to call a Remix action to restart the game
        setBombTimer(initialTimer);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <p style={{ fontSize: '32px' }}>Time until explosion: {bombTimer}</p>
            <button onClick={restartGame} style={{ padding: '10px 20px', fontSize: '16px' }}>Restart Game</button>
        </div>
    );
};

export default BombDefusalGame;