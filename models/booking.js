// models/Booking.js
import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    date: String,
    guests: String,
    eventType: String,
    location: String,
    description: String,
});

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);