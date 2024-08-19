// File: /src/controllers/profileController.ts
import Player from "../models/Player";
import { Document } from 'mongoose';

interface ProfileData {
    // Define the properties of the profile data here
}

const updateProfile = async (playerId: string, profileData: ProfileData): Promise<Document | null> => {
    const updatedPlayer = await Player.findByIdAndUpdate(playerId, { $set: profileData }, { new: true });
    return updatedPlayer;
};

const getProfile = async (playerId: string): Promise<Document | null> => {
    const playerProfile = await Player.findById(playerId);
    return playerProfile;
};

export { updateProfile, getProfile };