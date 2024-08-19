// /src/models/Player.ts
import Inventory, { ItemType } from './Inventory';
import { PlayerData } from "../components/interfaces";

interface Position {
    x: number;
    y: number;
}

interface Item {
    name: string;
    cost: number;
    type: ItemType;
}

class Player {
    private health: number;
    public readonly id: string;
    public name: string;
    public team: string;
    public money: number;
    public color: string;
    public position: Position;
    public inventory: Inventory;
    private performance: number;

    constructor(playerData: PlayerData) {
        this.id = playerData.id;
        this.name = playerData.name;
        this.team = playerData.team || "";
        this.money = playerData.money;
        this.color = playerData.color;
        this.position = { x: 0, y: 0 };
        this.health = playerData.health || 100;
        this.inventory = new Inventory([]);
        this.performance = 50;
    }

    getHealth(): number {
        return this.health;
    }

    getPerformance(): number {
        return this.performance;
    }

    move(x: number, y: number): void {
        if (typeof x !== 'number' || typeof y !== 'number') {
            console.error('Invalid coordinates: x and y must be numbers');
            return;
        }
        this.position = { x, y };
        console.log(`Moved to position (${x}, ${y})`);
    }

    buyItem(item: Item): void {
        if (this.money >= item.cost) {
            this.money -= item.cost;
            this.inventory.addItem(item);
            console.log(`Bought item: ${item.name}`);
        } else {
            console.error('Not enough money to buy item');
        }
    }

    shoot(target: string): void {
        console.log(`${this.name} shoots at ${target}`);
    }
}

export default Player;