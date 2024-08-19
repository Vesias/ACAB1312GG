import { json, LoaderFunction, Outlet } from 'remix';
import React from 'react';

// Assume we have a series of game scene components imported
import MainScene from '~/routes/main';
import GameOverScene from '~/routes/gameOver';
// Additional scenes would be similarly imported and used in routes

// A loader function might pre-fetch any necessary data for initial scene setup
export const loader: LoaderFunction = async ({ request }) => {
  // Fetching necessary data for initializing the game scenes
  const initData = await fetchInitialSceneData();
  return json(initData);
};

const SceneManager: React.FC = () => {
  return (
      <div>
        <Outlet />  {/* This will render the current route's component based on the URL path */}
      </div>
  );
};

export default SceneManager;
