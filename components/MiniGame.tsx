import React, { useState, useEffect, useRef } from 'react';

const MiniGame = () => {
    const [targetsHit, setTargetsHit] = useState(0);
    const gameRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = gameRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                context.fillStyle = 'red';
                context.fillRect(50, 50, 100, 100); // Draw a target

                const handleCanvasClick = (event: MouseEvent) => {
                    const rect = canvas.getBoundingClientRect();
                    const x = event.clientX - rect.left;
                    const y = event.clientY - rect.top;
                    if (x > 50 && x < 150 && y > 50 && y < 150) {
                        console.log("Target hit!");
                        setTargetsHit(prevTargets => prevTargets + 1);
                    }
                };

                canvas.addEventListener('click', handleCanvasClick);
                return () => {
                    canvas.removeEventListener('click', handleCanvasClick);
                };
            }
        }
    }, [targetsHit]);

    return (
        <div>
            <canvas ref={gameRef} width="200" height="200" style={{ border: '1px solid black' }} />
            <p>Targets hit: {targetsHit}</p>
        </div>
    );
};

export default MiniGame;
