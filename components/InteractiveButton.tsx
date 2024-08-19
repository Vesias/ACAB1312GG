import React, { FC } from 'react';
import './Button.css'; // Ensure the path is correct based on your project structure

interface InteractiveButtonProps {
    text: string;
    onClick: () => void;
}

const InteractiveButton: FC<InteractiveButtonProps> = ({ text, onClick }) => {
    return (
        <button className="interactive-button" onClick={onClick} type="button">
            {text}
        </button>
    );
};

export default InteractiveButton;
