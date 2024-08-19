// File: /src/services/matchmakingSystem.ts
const { enqueuePlayer, dequeuePlayer } = require('../models/matchmakingQueue');
const { findMatches } = require('../models/skillBasedAlgorithm');

const joinMatchmaking = async (playerId, skillLevel) => {
    enqueuePlayer(playerId, skillLevel);
};

const createMatch = async () => {
    const playersToMatch = dequeuePlayer();
    const matches = findMatches(playersToMatch);
    return matches;
};

module.exports = { joinMatchmaking, createMatch };
