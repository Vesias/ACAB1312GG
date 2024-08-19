// File: src/components/MainScene.tsx
import { json, LoaderFunction, useLoaderData } from 'remix';
import React, { useState } from 'react';
import { Stage, Layer, Image, Text } from 'react-konva';
import useImage from 'use-image';

interface MenuItem {
    text: string;
    mode: string;
}

interface SceneSettings {
    backgroundUrl: string;
    menuItems: MenuItem[];
}

export const loader: LoaderFunction = async ({ request }) => {
    // Define background URL and menu items dynamically if needed
    const settings: SceneSettings = {
        backgroundUrl: '/assets/backgrounds/myBackground.jpg',
        menuItems: [
            { text: 'MATCHMAKING', mode: 'startMatchmaking' },
            { text: 'TeamLive', mode: 'startLivePreview' },
            { text: 'Create A Strat', mode: 'startCreateAStrat' },
            { text: 'Options', mode: 'openOptions' },
            { text: 'Fixpoint Wiki', mode: 'openFixpointWiki' },
            { text: 'Player Profile', mode: 'openPlayerProfile' },
            { text: 'Team Profile', mode: 'openTeamProfile' },
        ]
    };
    return json(settings);
};

const MainScene: React.FC = () => {
    const settings = useLoaderData<SceneSettings>();
    const [background] = useImage(settings.backgroundUrl);
    const [menuVisible, setMenuVisible] = useState(true);

    const handleMenuSelection = (mode: string) => {
        console.log(`${mode} selected`);
        setMenuVisible(false); // Additional actions based on mode could be routed here
    };

    return (
        <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
                <Image image={background} width={window.innerWidth} height={window.innerHeight} />
                {menuVisible && settings.menuItems.map((item, idx) => (
                    <Text
                        key={idx}
                        x={window.innerWidth / 2 - 100}
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

export default MainScene;
