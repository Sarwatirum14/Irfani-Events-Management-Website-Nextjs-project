// app/api/bookings/route.js
import { connectToDatabase } from '@/lib/mongodb';
import Booking from '@/models/booking';

export async function POST(req) {
    try {
        const data = await req.json();
        await connectToDatabase();
        const savedBooking = await Booking.create(data);
        return new Response(JSON.stringify(savedBooking), { status: 201 });
    } catch (error) {
        console.error('Error saving booking:', error);
        return new Response(JSON.stringify({ error: 'Failed to save booking' }), { status: 500 });
    }
}

export async function GET() {
    try {
        await connectToDatabase();
        const bookings = await Booking.find();
        return new Response(JSON.stringify(bookings), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch bookings' }), { status: 500 });
    }
}