// File: /app/components/PlayerDisplay.tsx
import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'remix';
import { Image as KonvaImage, Group, Rect, Text } from 'react-konva';

interface PlayerProps {
    id: string;
    x: number;
    y: number;
    health: number;
    team: string;
    weaponIcon: string;  // URL for weapon icon image
    kevlarIcon: string;  // URL for kevlar icon image
    kevlarHelmetIcon: string;  // URL for kevlar helmet icon image
}

const PlayerDisplay: React.FC = () => {
    const player = useLoaderData<PlayerProps>();
    const [armorImage, setArmorImage] = useState<HTMLImageElement>(new Image());
    const [helmetImage, setHelmetImage] = useState<HTMLImageElement>(new Image());
    const [weaponImage, setWeaponImage] = useState<HTMLImageElement>(new Image());

    useEffect(() => {
        armorImage.src = player.kevlarIcon;
        helmetImage.src = player.kevlarHelmetIcon;
        weaponImage.src = player.weaponIcon;
    }, [player.kevlarIcon, player.kevlarHelmetIcon, player.weaponIcon]);

    return (
        <Group x={player.x} y={player.y} draggable>
            <Rect width={200} height={140} fill={player.team === 'CT' ? '#ff6347' : '#6495ed'} />
            <Text text={`Health: ${player.health}`} fontSize={16} y={10} fill='#fff' />
            <KonvaImage image={armorImage} />
            <KonvaImage image={helmetImage} />
            <KonvaImage image={weaponImage} />
        </Group>
    );
};

export default PlayerDisplay;
