// src/routes/Index.tsx in Remix
import { Outlet, Link } from 'remix';
import React from 'react';

export default function Index() {
    return (
        <div>
            <header>
                <nav>
                    <Link to="/main">Main</Link>
                    <Link to="/menu">Menu</Link>
                    <Link to="/matchmaking">Matchmaking</Link>
                    <Link to="/map-selection">Map Selection</Link>
                    {/* Add other links as needed */}
                </nav>
            </header>
            <main>
                <Outlet />  {/* Nested routes will render their components here */}
            </main>
        </div>
    );
}
