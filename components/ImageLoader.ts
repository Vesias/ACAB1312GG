// File: ImageLoader.ts
export class ImageLoader {
    private imageCache: Map<string, HTMLImageElement>;

    constructor() {
        this.imageCache = new Map();
    }

    loadImage(src: string): Promise<HTMLImageElement> {
        if (this.imageCache.has(src)) {
            return Promise.resolve(this.imageCache.get(src)!);
        }

        const image = new Image();
        image.src = src;
        return new Promise((resolve, reject) => {
            image.onload = () => {
                this.imageCache.set(src, image);
                resolve(image);
            };
            image.onerror = () => {
                reject(new Error(`Failed to load image at ${src}`));
            };
        });
    }
}
