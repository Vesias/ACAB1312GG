import { json, LoaderFunction, ActionFunction } from 'remix';
import React from 'react';
import styled from 'styled-components';

interface GameOverScreenProps {
    score: number;
    onRestart: () => void;
    onExit: () => void;
}

const CenteredDiv = styled.div`
    text-align: center;
    margin-top: 20vh;
`;

const Button = styled.button`
    margin: 10px;
    padding: 10px 20px;
`;

// Loader function could fetch any relevant end-game data, like high scores or player stats
export const loader: LoaderFunction = async ({ request }) => {
    // Logic to fetch game-related data or settings
    const data = { score: await fetchLatestScore(request) };  // Example function to fetch latest score
    return json(data);
};

// Action functions to handle game restart or exit
export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const actionType = formData.get('actionType');

    switch (actionType) {
        case 'restart':
            // Restart game logic
            break;
        case 'exit':
            // Exit game logic
            break;
    }

    return null;  // Return appropriate response or redirect
};

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, onRestart, onExit }) => {
    return (
        <CenteredDiv>
            <h1>Game Over</h1>
            <p>Score des Spielers: {score}</p>
            <Button onClick={onRestart}>Restart Game</Button>
            <Button onClick={onExit}>Exit Game</Button>
        </CenteredDiv>
    );
};

export default GameOverScreen;
