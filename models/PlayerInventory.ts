// src/models/PlayerInventory.ts
class PlayerInventory {
    money: number;
    items: { [key: string]: number };

    constructor() {
        this.money = 0;
        this.items = {};
    }

    addMoney(amount: number) {
        if (typeof amount === 'number' && amount > 0) {
            this.money += amount;
        }
    }

    removeMoney(amount: number): boolean {
        if (typeof amount === 'number' && amount > 0 && this.money >= amount) {
            this.money -= amount;
            return true;
        }
        return false;
    }

    addItem(name: string, quantity: number = 1) {
        if (typeof name === 'string' && name.length > 0 && Number.isInteger(quantity) && quantity > 0) {
            this.items[name] = (this.items[name] || 0) + quantity;
        }
    }

    removeItem(name: string, quantity: number = 1): boolean {
        if (this.items[name] && Number.isInteger(quantity) && quantity > 0) {
            this.items[name] -= quantity;
            if (this.items[name] <= 0) {
                delete this.items[name];
            }
            return true;
        }
        return false;
    }

    displayInventory() {
        console.log(`Money: ${this.money}`);
        Object.entries(this.items).forEach(([name, quantity]) => {
            console.log(`${name}: ${quantity}`);
        });
    }
}

export default PlayerInventory;
