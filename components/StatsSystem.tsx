interface PlayerStats {
    [key: string]: number;
}

class StatsSystem {
    private spielerStats: Record<string, PlayerStats>;

    constructor() {
        this.spielerStats = {};
    }

    updateStat(spielerId: string, statName: string, wert: number): void {
        if (!this.spielerStats[spielerId]) {
            this.spielerStats[spielerId] = {};
        }

        this.spielerStats[spielerId][statName] = (this.spielerStats[spielerId][statName] || 0) + wert;
        console.log(`Stat updated for ${spielerId}: ${statName} is now ${this.spielerStats[spielerId][statName]}`);
    }

    getStats(spielerId: string): PlayerStats {
        return this.spielerStats[spielerId] || {};
    }

    resetStats(spielerId: string): void {
        if (this.spielerStats[spielerId]) {
            this.spielerStats[spielerId] = {};
            console.log(`Stats reset for player ${spielerId}`);
        }
    }
}

export default StatsSystem;
