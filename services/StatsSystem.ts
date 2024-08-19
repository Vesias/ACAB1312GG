// src/services/StatsSystem.ts
class StatsSystem {
    private spielerStats: {[key: string]: {[statName: string]: number}} = {};

    updateStat(spielerId: string, statName: string, wert: number) {
        if (!this.spielerStats[spielerId]) {
            this.spielerStats[spielerId] = {};
        }
        this.spielerStats[spielerId][statName] = (this.spielerStats[spielerId][statName] || 0) + wert;
    }

    getStats(spielerId: string) {
        return this.spielerStats[spielerId] || {};
    }
}

export default StatsSystem;
