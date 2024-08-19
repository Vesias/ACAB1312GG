import { json, LoaderFunction, ActionFunction } from 'remix';
import React, { useState, useEffect } from 'react';
import ItemComponent from '../components/ItemComponent'; // Ensure the path is correct

interface Item {
    id: string;
    name: string;
    category: string;
    price: number;
    type: string;
    cost: number;
}

interface BuyMenuSceneProps {
    playerFunds: number;
    updateInventory: (itemId: string) => void;
    toggleMenu: () => void;
}

// Loader function to fetch initial data
export const loader: LoaderFunction = async ({ request }) => {
    const categories = await fetchCategories();
    const itemsData: Item[] = await fetchItems();
    return json({ categories, itemsData });
};

// Action function to handle inventory updates
export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const itemId = formData.get('itemId') as string;
    // Process inventory update
    return null; // Replace with appropriate response
};

const BuyMenuScene: React.FC<BuyMenuSceneProps> = ({
                                                       playerFunds,
                                                       updateInventory,
                                                       toggleMenu,
                                                   }) => {
    // State hooks here, e.g., selected items

    return (
        <div>
            <h1>Buy Menu</h1>
            {/* Rendering items using ItemComponent */}
        </div>
    );
};

export default BuyMenuScene;
