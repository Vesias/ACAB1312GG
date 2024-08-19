// File: /app/services/eventHandling.ts

import { processEvent } from '../models/eventQueue';
import { handlePlayerInteraction } from '../models/playerController';
import { updateGame } from './gameLogic';

export const handleIncomingEvent = (event: { type: string }) => {
    console.log(`Received event: ${event.type}`);
    processEvent(event);
};

export const handleGameEvent = (event: { type: string; details: any }) => {
    console.log(`Handling game event: ${event.type}`);
    updateGame(event.details);
};

export const handlePlayerEvent = (event: { type: string; details: any }) => {
    console.log(`Handling player event: ${event.type}`);
    handlePlayerInteraction(event.details);
};
