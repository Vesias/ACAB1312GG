// src/components/Menu.tsx
import React, { useState } from 'react';
import { json, LoaderFunction, useLoaderData } from 'remix';
import { Stage, Layer, Text } from 'react-konva';
import useWindowSize from '~/hooks/useWindowSize'; // Adjust the path as needed

interface MenuItem {
    text: string;
    mode: string;
}

// This could be moved to a more centralized file if used in multiple components
export const loader: LoaderFunction = async ({ request }) => {
    // This example assumes you may have different items based on user roles or settings
    const menuItems: MenuItem[] = [
        { text: 'MATCHMAKING', mode: 'startMatchmaking' },
        { text: 'TeamLive', mode: 'startLivePreview' },
        { text: 'Create A Strat', mode: 'startCreateAStrat' },
        { text: 'Options', mode: 'openOptions' },
        { text: 'Fixpoint Wiki', mode: 'openFixpointWiki' },
        { text: 'Player Profile', mode: 'openPlayerProfile' },
        { text: 'Team Profile', mode: 'openTeamProfile' },
    ];
    return json({ menuItems });
};

const Menu: React.FC = () => {
    const [menuVisible, setMenuVisible] = useState(true);
    const { width, height } = useWindowSize();
    const { menuItems } = useLoaderData<{ menuItems: MenuItem[] }>();

    const handleMenuSelection = (mode: string) => {
        console.log(`${mode} selected`);
        setMenuVisible(false);
        // Additional logic for routing or state updates can go here
    };

    return (
        <Stage width={width} height={height}>
            <Layer>
                {menuVisible && menuItems.map((item, idx) => (
                    <Text
                        key={idx}
                        x={width / 2 - 100}
                        y={150 + idx * 60}
                        text={item.text}
                        fontSize={24}
                        fill="#fff"
                        onClick={() => handleMenuSelection(item.mode)}
                    />
                ))}
            </Layer>
        </Stage>
    );
};

export default Menu;
