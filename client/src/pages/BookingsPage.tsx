import React, { useEffect, useState } from 'react'
import AccountNav from '../components/AccountNav'
import axios from 'axios'
import PlaceImg from '../components/PlaceImg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import BookingDates from '../components/BookingDates'
import { BookingProps } from '../Types/Types'

const BookingsPage = () => {
    const [bookings, setBookings] = useState<BookingProps[]>([])

    useEffect(() => {
        axios.get('/bookings').then((response) => {
            setBookings(response.data)
        })
    }, [])

    return (
        <div>
            <AccountNav />
            <div>
                {
                    bookings.length > 0 && bookings.map((booking) => (
                        <Link to={`/account/bookings/${booking._id}`} className='flex gap-4 bg-gray-200 rounded-2xl'>
                            <div className='w-48'>
                                <PlaceImg place={booking.place} />
                            </div>

                            <div className='py-4 pr-3 grow'>
                                <h2 className='text-xl'>{booking.place.title}</h2>

                                <div className='text-xl'>
                                    <BookingDates booking={booking} className='mb-2 mt-4 text-gray-500'/>
                                    <div className="flex gap-1">
                                        <FontAwesomeIcon className='w-8 h-8' icon={faWallet} />
                                        <span className='text-2xl'>Total Price: ${booking.price as React.ReactNode}</span>
                                    </div>

                                </div>

                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default BookingsPage