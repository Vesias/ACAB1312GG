// File: /src/controllers/playerController.ts
interface Interaction {
    playerId: string;
    // Add other properties of interaction here
}

const handlePlayerInteraction = (interaction: Interaction) => {
    console.log(`Interacting with player: ${interaction.playerId}`);
    // Add your logic to handle player interaction
};

export { handlePlayerInteraction };