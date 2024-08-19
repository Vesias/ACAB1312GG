// File: PlayerInitService.ts
import { ImageLoader } from './ImageLoader';

class PlayerInitService {
    private ctx: CanvasRenderingContext2D;
    private team: string;
    private sprite: { image: HTMLImageElement, x: number, y: number } | null;
    private gameWidth: number;
    private gameHeight: number;
    private imageLoader: ImageLoader;

    constructor(canvasContext: CanvasRenderingContext2D, team: string, gameWidth: number, gameHeight: number) {
        this.ctx = canvasContext; // The rendering context
        this.team = team; // Player's team
        this.gameWidth = gameWidth; // Game area width
        this.gameHeight = gameHeight; // Game area height
        this.sprite = null; // Player's sprite image
        this.imageLoader = new ImageLoader();
        this.initSprite();
    }

    private async initSprite(): Promise<void> {
        const texture = this.team === 'CT' ? 'ct_icon.png' : 't_icon.png'; // Load team-specific icon
        try {
            const image = await this.imageLoader.loadImage(texture);
            const x = this.randomPosition(50, this.gameWidth - 50);
            const y = this.randomPosition(50, this.gameHeight - 50);
            this.sprite = {
                image: image,
                x: x,
                y: y
            };
            this.draw();
        } catch (error) {
            console.error("Failed to load player sprite:", error);
        }
    }

    private randomPosition(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    move(newX: number, newY: number): void {
        if (this.sprite) {
            this.sprite.x = newX;
            this.sprite.y = newY;
            this.draw();
        } else {
            throw new Error("Sprite not initialized.");
        }
    }

    private draw(): void {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight); // Clears the canvas
        this.ctx.drawImage(this.sprite!.image, this.sprite!.x, this.sprite!.y);
    }
}

export { PlayerInitService }; // Export the class
