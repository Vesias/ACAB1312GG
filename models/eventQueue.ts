// File: /src/models/eventQueue.ts
const EventEmitter = require('events');
class EventQueue extends EventEmitter {}

const eventQueue = new EventQueue();

eventQueue.on('playerAction', (event) => {
    console.log(`Processing player action: ${event.details}`);
    // Handle player action
});

eventQueue.on('gameUpdate', (event) => {
    console.log(`Processing game update: ${event.details}`);
    // Update game state
});

const processEvent = (event) => {
    eventQueue.emit(event.type, event);
};

module.exports = { processEvent };
