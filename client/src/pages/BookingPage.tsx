import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddressLink from '../AddressLink'
import PlaceGallery from '../PlaceGallery'
import BookingDates from '../BookingDates'
interface PlaceType {
    photos: string[],
    _id: string,
    owner: string,
    title: string,
    address: string,
    description: string,
    perks: string[],
    extraInfo: string,
    checkIn: string,
    checkOut: string,
    maxGuests: Number,
    __v: number
}
interface BookingProps {
    __v: string,
    _id: string,
    place: PlaceType,
    user: string,
    checkIn: Date,
    checkOut: Date,
    maxGuests: Number,
    price: Number,
    name: string,
    mobile: string,
    numberOfGuests: Number,
}
const BookingPage = () => {
    const { id } = useParams()
    const [booking, setBooking] = useState<BookingProps | null>(null)

    useEffect(() => {
        if (id) {
            axios.get('/bookings').then((response) => {
                const foundBooking = response.data.find(({ _id }: { _id: string }) => _id === id)
                if (foundBooking) {
                    setBooking(foundBooking)
                }
            })
        }
    }, [])

    if (!booking) {
        return ''
    }
    return (
        <div className='my-8'>
            <h1 className='text-3xl'>{booking.place.title}</h1>
            <AddressLink className='my-2 block'>{booking.place.address}</AddressLink>
            <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
                <div>
                    <h2 className='text-2xl mb-4'>Your booking information:</h2>
                    <BookingDates booking={booking} />
                </div>
                <div className='bg-primary p-6 text-white rounded-2xl '>
                    <div>Total Price:</div>
                    <div className='text-3xl'>$ {booking.price as React.ReactNode}</div>

                </div>
            </div>
            <PlaceGallery place={booking.place} />
        </div>
    )
}

export default BookingPage