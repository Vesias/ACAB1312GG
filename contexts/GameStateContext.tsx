// app/contexts/GameStateContext.tsx
import React, { createContext, useContext, useReducer, useState, ReactNode, Dispatch } from 'react';

interface Player {
    id: number;
    name: string;
    health: number;
    armor: number;
    x: number;
    y: number;
    team: string;
}

interface GameState {
    players: Player[];
}

type Action = { type: 'MOVE_PLAYER'; payload: { id: number; position: { x: number; y: number } } };

const initialState: GameState = {
    players: [
        { id: 1, name: 'Spieler 1', health: 100, armor: 50, x: 100, y: 100, team: 'red' },
        { id: 2, name: 'Spieler 2', health: 100, armor: 50, x: 150, y: 100, team: 'red' },
    ]
};

function gameStateReducer(state: GameState, action: Action): GameState {
    switch (action.type) {
        case 'MOVE_PLAYER':
            return {
                ...state,
                players: state.players.map(player =>
                    player.id === action.payload.id ? { ...player, x: action.payload.position.x, y: action.payload.position.y } : player
                )
            };
        default:
            return state;
    }
}

const GameStateContext = createContext<GameState | undefined>(undefined);

export const GameStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(gameStateReducer, initialState);
    return (
        <GameStateContext.Provider value={state}>
            {children}
        </GameStateContext.Provider>
    );
};

export const useGameState = () => {
    const context = useContext(GameStateContext);
    if (!context) {
        throw new Error('useGameState must be used within a GameStateProvider');
    }
    return context;
};
