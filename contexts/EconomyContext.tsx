import { json, LoaderFunction, ActionFunction } from 'remix';
import React, { useState, useContext, createContext } from 'react';

interface EconomyState {
    [playerId: string]: number;
}

interface EconomyProviderProps {
    children: React.ReactNode;
}

const EconomyContext = createContext<EconomyState | undefined>(undefined);

export const useEconomy = () => {
    const context = useContext(EconomyContext);
    if (!context) {
        throw new Error('useEconomy must be used within a EconomyProvider');
    }
    return context;
};

// EconomyProvider remains largely the same but could optionally fetch initial state from server
export const EconomyProvider = ({ children }: EconomyProviderProps) => {
    const [playersMoney, setPlayersMoney] = useState<EconomyState>({});

    return (
        <EconomyContext.Provider value={playersMoney}>
            {children}
        </EconomyContext.Provider>
    );
};

// Server-side handling of updating player money
export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const playerId = formData.get('playerId') as string;
    const amount = parseInt(formData.get('amount') as string);

    // Here you would update the player's money on the server
    return json({ playerId, amount });
};
