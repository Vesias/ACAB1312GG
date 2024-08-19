// src/services/HealthComponent.ts
import { validateParams } from '../utils'; // Adjust path as necessary

export default class HealthComponent {
    private value: number;

    constructor(value: number) {
        validateParams({value});  // Ensure validateParams is properly typed for TypeScript usage
        this.value = Math.max(0, value);
    }

    public setValue(newValue: number): void {
        validateParams({newValue});
        this.value = Math.max(0, newValue);
    }

    public getValue(): number {
        return this.value;
    }
}
