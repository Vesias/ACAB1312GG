// src/routes/inventory.tsx in Remix
import { json, LoaderFunction, ActionFunction, useLoaderData } from 'remix';
import React, { useState } from 'react';

interface InventoryItem {
    type: string;
    name: string;
    count: number;
}

interface InventoryData {
    items: InventoryItem[];
    money: number;
}

// Loader function to initialize or retrieve the inventory
export const loader: LoaderFunction = async ({ request }) => {
    // Simulate fetching inventory data from a database or session
    const inventory = await getInventoryData();
    return json(inventory);
};

// Action function to update the inventory
export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const item = { type: formData.get('type'), name: formData.get('name') };
    const action = formData.get('action');  // 'add' or 'remove'
    const updatedInventory = await updateInventory(item, action);
    return json(updatedInventory);
};

const Inventory = () => {
    const inventoryData = useLoaderData<InventoryData>();
    const [inventory, setInventory] = useState(inventoryData);

    const handleUpdate = async (item: InventoryItem, action: string) => {
        // Call the action with fetch to update inventory
        const response = await fetch('/routes/inventory', {
            method: 'POST',
            body: new URLSearchParams({ ...item, action })
        });
        const updated = await response.json();
        setInventory(updated);
    };

    return (
        <div>
            {inventory.items.map(item => (
                <div key={item.name}>
                    <p>{item.name}: {item.count}</p>
                    <button onClick={() => handleUpdate(item, 'add')}>Add</button>
                    <button onClick={() => handleUpdate(item, 'remove')}>Remove</button>
                </div>
            ))}
            <p>Total Money: ${inventory.money}</p>
        </div>
    );
};

export default Inventory;
