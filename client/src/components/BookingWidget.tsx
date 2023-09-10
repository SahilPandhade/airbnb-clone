import axios from 'axios';
import { differenceInCalendarDays } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/Context';
interface PlacesProps {
    _id: string,
    __v: string,
    owner: string,
    title: string,
    address: string,
    photos: string[],
    description: string,
    perks: string[],
    extraInfo: string,
    checkIn: string,
    checkOut: string,
    maxGuests: Number,
    price: Number,
}
const BookingWidget = ({ place }: { place: PlacesProps }) => {

    const [checkIn, setCheckIn] = useState<string>('');
    const [checkOut, setCheckOut] = useState<string>('');
    const [numberOfGuests, setNumberOfGuests] = useState<number>(1);

    const [name,setName] = useState<string>('');
    const [mobile,setMobile] = useState<string>('');

    const [redirect,setRedirect] = useState<string>('');

    const {user} = useContext(UserContext)

    useEffect(()=>{
        if(user){
            setName(user.name)
        }
    }, [])

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    const bookThisPlace = async () =>{
        const response = await axios.post('/bookings',{
            checkIn,checkOut,numberOfGuests,name,mobile,
            place:place._id,
            price:numberOfNights*Number(place.price)})
        const bookingId = response.data._id;
        setRedirect(`/account/bookins/${bookingId}`)
    }

    if(redirect){
        return <Navigate to={redirect} />
    }

    return (
        <div className='bg-white shadow p-4 rounded-2xl'>
            <div className='text-2xl text-center'>
                Price: ${place.price as React.ReactNode} / per night
            </div>
            <div className='border rounded-2xl mt-4'>
                <div className='flex'>
                    <div className='py-3 px-4'>
                        <label>Check in:</label>
                        <input className='cursor-pointer' type='date' value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                    </div>
                    <div className='py-3 px-4 border-l'>
                        <label>Check out:</label>
                        <input className='cursor-pointer' type='date' value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                    </div>
                </div>
                <div className='py-3 px-4 border-t'>
                    <label>Number of guests:</label>
                    <input type='number' value={numberOfGuests} onChange={(e) => setNumberOfGuests(Number(e.target.value))} />
                </div>
                {
                    numberOfNights > 0 && (
                        <div className='py-3 px-4 border-t'>
                            <label>Your full Name:</label>
                            <input type='text' value={name} onChange={(e) => setName(e.target.value)} />

                            <label>Phone number:</label>
                            <input type='telephone' value={mobile} onChange={(e) => setMobile(e.target.value)} />
                        </div>
                    )
                }
            </div>
            <button onClick={bookThisPlace} className='primary mt-4'>
                Book this place
                {numberOfNights > 0 && (
                    <span>$ {numberOfNights * Number(place.price)}</span>
                )}
            </button>
        </div>
    )
}

export default BookingWidget