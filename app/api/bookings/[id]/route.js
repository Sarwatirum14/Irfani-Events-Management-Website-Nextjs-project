// app/api/bookings/[id]/route.js
import { connectToDatabase } from '@/lib/mongodb';
import Booking from '@/models/booking';

export async function PUT(req, { params }) {
    try {
        const { id } = params;
        const updatedData = await req.json();
        await connectToDatabase();
        const updatedBooking = await Booking.findByIdAndUpdate(id, updatedData, { new: true });
        return new Response(JSON.stringify(updatedBooking), { status: 200 });
    } catch (error) {
        console.error('Error updating booking:', error);
        return new Response(JSON.stringify({ error: 'Failed to update booking' }), { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = params;
        await connectToDatabase();
        await Booking.findByIdAndDelete(id);
        return new Response(JSON.stringify({ message: 'Booking deleted' }), { status: 200 });
    } catch (error) {
        console.error('Error deleting booking:', error);
        return new Response(JSON.stringify({ error: 'Failed to delete booking' }), { status: 500 });
    }
}