// src/components/SelectionCanvas.tsx
import React, { useRef, useState, useEffect } from 'react';

const SelectionCanvas = () => {
    const canvasRef = useRef(null);
    const [isSelecting, setIsSelecting] = useState(false);
    const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
    const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
    const [showToolbar, setShowToolbar] = useState(false);

    const draw = (ctx, start, end) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(start.x, start.y, end.x - start.x, end.y - start.y);
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#FFFFFF';
        ctx.rect(start.x, start.y, end.x - start.x, end.y - start.y);
        ctx.stroke();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (isSelecting) {
            draw(context, startPoint, endPoint);
        } else {
            context.clearRect(0, 0, canvas.width, canvas.height);
            setShowToolbar(true);
        }
    }, [endPoint, isSelecting]);

    const handleMouseDown = (e) => {
        const rect = e.target.getBoundingClientRect();
        setStartPoint({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setIsSelecting(true);
    };

    const handleMouseMove = (e) => {
        if (!isSelecting) return;
        const rect = e.target.getBoundingClientRect();
        setEndPoint({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseUp = () => {
        setIsSelecting(false);
        console.log('Selection made from:', startPoint, 'to:', endPoint);
    };

    const toolbar = showToolbar ? (
        <div style={{ position: 'absolute', top: `${endPoint.y}px`, left: `${endPoint.x}px` }}>
            <button onClick={() => setShowToolbar(false)}>Cancel</button>
            <button onClick={() => console.log('Selection confirmed!')}>Confirm</button>
        </div>
    ) : null;

    return (
        <>
            <canvas
                ref={canvasRef}
                width={800}
                height={600}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                style={{ cursor: isSelecting ? 'crosshair' : 'default', border: '2px solid #FFFFFF' }}
            />
            {toolbar}
        </>
    );
};

export default SelectionCanvas;
