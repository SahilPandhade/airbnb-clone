import { faCalendarDays, faMoon } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { differenceInCalendarDays, format } from 'date-fns'
import React from 'react'
import { BookingProps } from '../Types/Types'

const BookingDates = ({booking,className}:{booking:BookingProps,className?:string}) => {
    return (
        <div className={"flex gap-1 "+className}>
            <FontAwesomeIcon className='w-6 h-6' icon={faMoon} />
            {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))}nights
            <div className='flex gap-1 items-center ml-2'>
                <FontAwesomeIcon className='w-6 h-6' icon={faCalendarDays} />
                {format(new Date(booking.checkIn), 'yyyy-MM-dd')}
            </div>
            &rarr;
            <div className='flex gap-1 items-center'>
                <FontAwesomeIcon className='w-6 h-6' icon={faCalendarDays} />
                {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
            </div>
        </div>
    )
}

export default BookingDates