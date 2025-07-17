// lib/mongodb.js
import mongoose from 'mongoose';

export const connectToDatabase = async() => {
    if (mongoose.connections[0].readyState) return;

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to DB');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        throw error;
    }
};