class GameServiceSingleton {
    static instance = null;
    players = new Map();
    isRoundActive = false;

    constructor() {
        if (GameServiceSingleton.instance) {
            return GameServiceSingleton.instance;
        }
        this.init();
        GameServiceSingleton.instance = this;
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new GameServiceSingleton();
        }
        return this.instance;
    }

    init() {
        console.log("Game Service Initialized");
    }

    addPlayer(playerData) {
        if (!playerData.id || this.players.has(playerData.id)) {
            return console.error('Invalid player data or player already exists.');
        }
        this.players.set(playerData.id, playerData);
        console.log(`Player added: ${playerData.name}`);
    }

    startNewGame() {
        this.isRoundActive = true;
        console.log("New game started");
    }
}

module.exports = GameServiceSingleton;
