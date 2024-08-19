// src/types/index.tsx
export interface MapType {
    id: number;
    name: string;
    description?: string;
    // other properties as necessary
}
export interface MapData {
    maps: MapType[];
}