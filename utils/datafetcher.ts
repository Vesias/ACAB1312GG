// src/utils/dataFetcher.ts
export async function fetchMapData(): Promise<any> {
    const response = await fetch('https://example.com/api/maps');
    const data = await response.json();
    return data;
}
